
// https://cursos.alura.com.br/forum/topico-o-que-significa-o-underline-em-a-za-z0-9_-39862
export default function containsSpecialChars(str: string) {
    const contains = /[^a-zA-Z0-9_]/;
    return contains.test(str);
    
}