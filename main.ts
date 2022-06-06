class DL {
  static dlFile = (event: PointerEvent) => {
    event.preventDefault();
    fetch("http://localhost:8000/fileget.php", {
      method: "GET",
    })
      .then(async (response) => {
        if (!response.ok) {
          // AxiosならerrorオブジェクトとしてバックエンドのエラーJSONが拾えるはず
          throw new Error(response.statusText);
        }
        const blob = await response.blob();
        const { headers } = response;
        return { blob, headers };
      })
      .then((data) => {
        const contentDisposition = data.headers.get("content-disposition");
        const fileName =
          this.getFileNameFromContentDisposition(contentDisposition);
        const anchor = document.createElement("a");
        anchor.href = window.URL.createObjectURL(data.blob);
        anchor.download = fileName;
        anchor.click();
      })
      .catch((error) => {
        // エラースナックバーを表示
      });
  };
  // バックエンドで指定されたファイル名を取得
  // コピペ
  // https://tkkm.tokyo/post-243/
  private static getFileNameFromContentDisposition = (disposition: string) => {
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/; // 正規表現でfilenameを抜き出す
    const matches = filenameRegex.exec(disposition);
    if (matches != null && matches[1]) {
      const fileName = matches[1].replace(/['"]/g, "");
      return decodeURI(fileName); // 日本語対応
    } else {
      return null;
    }
  };
}
