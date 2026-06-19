function getJawabanAI(pesan) {

    pesan = pesan.toLowerCase();

    if (pesan.includes("algoritma")) {
        return "Algoritma adalah urutan langkah-langkah logis dan sistematis untuk menyelesaikan suatu masalah.";
    }

    if (pesan.includes("blockchain")) {
        return "Blockchain adalah teknologi penyimpanan data terdistribusi yang aman dan transparan.";
    }

    if (pesan.includes("database")) {
        return "Database adalah kumpulan data yang tersusun secara sistematis.";
    }

    if (pesan.includes("html")) {
        return "HTML adalah bahasa markup yang digunakan untuk membuat struktur website.";
    }

    if (pesan.includes("css")) {
        return "CSS digunakan untuk mempercantik tampilan website.";
    }

    return "Maaf, materi tersebut belum tersedia dalam SmartStudy AI.";
}