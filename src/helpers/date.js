function dateStringToDate(dateString) {
    try {
      var year = dateString.substring(0, 4);
      var month = dateString.substring(4, 6);
      var day = dateString.substring(6, 8);
      var date = new Date(year, month - 1, day);
      const offset = date.getTimezoneOffset()
      // date = new Date(date.getTime() - (offset * 60 * 1000));
      
      var tahun = date.getFullYear();
      var bulan = date.getMonth();
      var tanggal = date.getDate();
      var hari = date.getDay();
      var jam = date.getHours();
      var menit = date.getMinutes();
      var detik = date.getSeconds();
      switch(hari) {
       case 0: hari = "Minggu"; break;
       case 1: hari = "Senin"; break;
       case 2: hari = "Selasa"; break;
       case 3: hari = "Rabu"; break;
       case 4: hari = "Kamis"; break;
       case 5: hari = "Jum'at"; break;
       case 6: hari = "Sabtu"; break;
      }
      switch(bulan) {
       case 0: bulan = "Januari"; break;
       case 1: bulan = "Februari"; break;
       case 2: bulan = "Maret"; break;
       case 3: bulan = "April"; break;
       case 4: bulan = "Mei"; break;
       case 5: bulan = "Juni"; break;
       case 6: bulan = "Juli"; break;
       case 7: bulan = "Agustus"; break;
       case 8: bulan = "September"; break;
       case 9: bulan = "Oktober"; break;
       case 10: bulan = "November"; break;
       case 11: bulan = "Desember"; break;
      }
      
      return hari + ', ' + tanggal + ' ' + bulan + ' ' + tahun
    } catch (error) {
      return null;
    }
}

module.exports = {
    dateStringToDate
}