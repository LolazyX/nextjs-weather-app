export default function dateBuild(dt: number) {
    const objectDate = new Date(dt * 1000)

    const date = objectDate .getDate()
    const month = objectDate .getMonth()
    const year = objectDate .getFullYear()
    const hours = objectDate.getHours()
    const minutes = objectDate.getMinutes()
    const seconds = objectDate.getSeconds()

    let dateFormat = `${date}`

    if (date >= 1 && date <= 9) {
        dateFormat = '0' + dateFormat
    }

    return `${year}-${month}-${dateFormat}T${hours}:${minutes}:${seconds}`
}