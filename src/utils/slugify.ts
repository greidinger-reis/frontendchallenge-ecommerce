export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD") // split an accented letter in the base letter and the a
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/\s+/g, "-"); // Replace spaces with -
}
