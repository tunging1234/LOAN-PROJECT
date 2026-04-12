/**
 * 通用 CSV 下載工具
 * @param {Array} headers - 欄位名稱陣列, e.g., ["期數", "本金"]
 * @param {Array} data - 二維陣列資料, e.g., [[1, 1000], [2, 1000]]
 * @param {string} filename - 下載的檔案名稱 (不含副檔名)
 */
function downloadCSV(headers, data, filename = "export") {
    // 1. 組合內容 (處理每一列)
    const rows = data.map(row => row.join(","));

    // 2. 加上 BOM (\uFEFF) 並組合表頭與內容
    const csvContent = "\uFEFF" + headers.join(",") + "\n" + rows.join("\n");

    // 3. 建立 Blob 物件
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // 4. 建立隱藏連結並觸發下載
    const link = document.createElement("a");
    const timestamp = new Date().toISOString().split('T')[0]; // 預設加上日期 yyyy-mm-dd

    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}_${timestamp}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();

    // 5. 清理 DOM 與記憶體
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}


function downloadJSON(schedules, summary) {
    // 1. 建立一個完整的物件結構
    const exportData = {
        exportDate: new Date().toISOString(),
        summary: summary,
        details: schedules
    };

    // 2. 序列化 (加上 null, 2 可以讓輸出的 JSON 縮排，方便閱讀)
    const jsonString = JSON.stringify(exportData, null, 2);

    // 3. 建立 Blob 並下載
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.download = `貸款試算報告_${new Date().getTime()}.json`;
    link.click();

    URL.revokeObjectURL(url);
}