export default function dateBuild() {
    const timestamp = Date.now();
    
    // แปลงเป็น ISO 8601 (โดยไม่มีมิลลิวินาทีและ Z)
    const date = new Date(timestamp);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // เพิ่ม 0 ถ้าหมายเลขเดือนมี 1 หลัก
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}