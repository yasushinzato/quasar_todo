// テキストの全選択をグローバル化
export const selectAll = {
  // 入力して再選択した場合、テキスト全体を選択状態にする。
  inserted(el) {
    // 開発ツールでCSSを確認する。 .のつけ忘れに注意すること
    let input = el.querySelector(".q-field__native");
    input.addEventListener("focus", () => {
      if (input.value.length) {
        input.select();
      }
    });
  }
}
