import redis from "@/lib/utils/redis";
import crypto from "crypto";
import { headers } from "next/headers";
import { Eye } from "lucide-react";

// thanks to https://ansubkhan.com/blogs/view-counter

async function recordViewCount(slug: string) {
    const headersList = headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const realIp = headersList.get("x-real-ip");

    const ipSource = forwardedFor || realIp || "localhost";

    const ip = ipSource.split(",")[0].trim();

    const hashedIp = crypto.createHash("sha256").update(ip).digest("hex");

    const viewKey = ["pageviews", "blogs", slug].join(":");
    const ipViewKey = ["ip", hashedIp, "views", slug].join(":");

    const hasViewed = await redis.get(ipViewKey);

    let viewCount: number;

    if (!hasViewed) {
        const pipeline = redis.pipeline();
        pipeline.incr(viewKey);
        pipeline.set(ipViewKey, "1");
        await pipeline.exec();

        viewCount = (await redis.get<number>(viewKey)) ?? 0;
        return { message: "View Added", status: 202, views: viewCount };
    } else {
        viewCount = (await redis.get<number>(viewKey)) ?? 0;
        return { message: "Already viewed", status: 200, views: viewCount };
    }
}

const ShowViews = async ({ slug }: { slug: string }) => {
    const { views } = await recordViewCount(slug);

    return (
        <div className="flex flex-row mt-2 gap-1 text-xs ">
            <Eye size={16} />
            <span>{views} views</span>
        </div>
    );
};

export default ShowViews;
