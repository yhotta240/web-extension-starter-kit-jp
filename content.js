let isEnabled = false; // ツールの有効状態を示すフラグ（初期値は無効）

// Sampleツールの有効/無効を処理する関数
const handleSampleTool = (isEnabled) => {
  if (isEnabled) { // ツールが有効になったときの処理
    // ここに何かの処理 または カスタム関数を追加
    window.alert("SampleがONになりました"); // アラートを表示
    console.log("SampleがONになりました"); // コンソールにメッセージを出力
  } else { // ツールが無効になったときの処理
    // ここに何かの処理 または カスタム関数を追加
    window.alert("SampleがOFFになりました"); // アラートを表示
    console.log("SampleがOFFになりました"); // コンソールにメッセージを出力
  }
};


// 最初の読み込みまたはリロード後に実行する処理
chrome.storage.local.get(['settings', 'isEnabled'], (data) => {
  // ストレージから取得した'isEnabled'の値を使用し，未設定の場合は既存の'isEnabled'を保持
  isEnabled = data.isEnabled !== undefined ? data.isEnabled : isEnabled;

  // 'isEnabled'の値に基づいてSampleツールを処理
  handleSampleTool(isEnabled);
});

// 特定のキー（Ctrl + B）が押されたときに実行される処理（ショートカット用）
document.addEventListener('keydown', (e) => {
  // 'b'キーが押され，Ctrlキーが押されているが，ShiftキーとAltキーは押されていない場合
  if (e.key === 'b' && e.ctrlKey && !e.shiftKey && !e.altKey) {
    // ストレージから'settings'と'isEnabled'の値を取得
    chrome.storage.local.get(['settings', 'isEnabled'], (data) => {
      // 'isEnabled'の値を反転
      isEnabled = !data.isEnabled;
      
      // 新しい設定をストレージに保存
      chrome.storage.local.set({ settings: data.settings, isEnabled: isEnabled });
      
      // 'isEnabled'の新しい値に基づいてSampleツールを処理
      handleSampleTool(isEnabled);
    });
  }
});


// ストレージの値が変更されたときに実行される処理
chrome.storage.onChanged.addListener((changes) => {
  // 'isEnabled'の変更があった場合，新しい値を取得し，未設定の場合は既存の'isEnabled'を保持
  isEnabled = changes.isEnabled ? changes.isEnabled.newValue : isEnabled;
  
  // 'isEnabled'の新しい値に基づいてSampleツールを処理
  handleSampleTool(isEnabled);
});

// 必要に応じてカスタム関数をここに定義していく
// これにより，特定の機能や処理をカプセル化し，再利用可能にする

