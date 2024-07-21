import RoomMain from '@/components/room/RoomMain'
import { createClient } from '@/utils/supabase/server'


export default async function Page({ params }: { params: { room: string } }) {
    const supabase = createClient()

    const { data, error } = await supabase.from('posts').select('content').eq('room', params.room).single()

    if (error) {
        console.error(error)
        return
    }

    const json = data?.content
    console.log(json)


    

    return (
        <div className='w-full'>
            <RoomMain json={json} />
        </div>
    )
}
