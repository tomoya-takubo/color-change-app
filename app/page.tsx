'use client';

import { Palette } from "lucide-react";
import { useEffect, useState } from "react";

const rgbToHex = (r: number, g:number, b:number ): string => {
  return "#" + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
}

// 明度計算関数
const calculatorBrightness = (r: number, g: number, b: number): number => {
  return (r * 299 + g * 587 + b * 114) / 1000;
}

// プリセットカラーの型
interface PresetColor {
  name: string;
  bg: string;
  text: string;
}

// グラデーションの型
interface GradientPreset{
  name: string;
  gradient: string;
}

export default function Home() {
  // 背景色を管理する
  const [backgroundColor, setBackgroundColor] = useState<string>('#3b82f6')
  // 赤色を管理
  const [red, setRed] = useState<number>(50);
  // 緑色を管理
  const [green, setGreen] = useState<number>(139);
  // 青色を管理
  const [blue, setBlue] = useState<number>(246);
  // テキストカラーを管理する
  const [textColor, setTextColor] = useState<string>('#FFFFFF');
  // グラデーションが有効か無効かを管理
  const [isGradient, setIsGradient] = useState<boolean>(false);
  // 現在のグラデーションの色
  const [currentGradient, setCurrentGradient] = useState<string>('');

  // プリセットカラー
  const presetColors: PresetColor[] = [
    { name: 'ブルー', bg: '#3B82F6', text: '#FFFFFF' },
    { name: 'グリーン', bg: '#10B981', text: '#FFFFFF' },
    { name: 'レッド', bg: '#EF4444', text: '#FFFFFF' },
    { name: 'パープル', bg: '#8B5CF6', text: '#FFFFFF' },
    { name: 'ピンク', bg: '#EC4899', text: '#FFFFFF' },
    { name: 'イエロー', bg: '#F59E0B', text: '#000000' },
    { name: 'インディゴ', bg: '#6366F1', text: '#FFFFFF' },
    { name: 'ティール', bg: '#14B8A6', text: '#FFFFFF' },
  ];

  // グラデーションプリセット
  const gradientPresets: GradientPreset[] = [
    { name: 'サンセット', gradient: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)' },
    { name: 'オーシャン', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
    { name: 'フォレスト', gradient: 'linear-gradient(135deg, #11998e, #38ef7d)' },
    { name: 'ファイア', gradient: 'linear-gradient(135deg, #FC466B, #3F5EFB)' },
  ];

  // RGB値が変更されたら自動で背景色を更新
  useEffect(() => {

    // スライダーが操作されたら（RGBの値が変わったら）グラデーションを無効化
    if(isGradient) return;

    // 背景色をセット
    const hexColor = rgbToHex(red, green, blue);
    setBackgroundColor(hexColor);

    // テキスト色をセット
    const brightness  = calculatorBrightness(red, green, blue);
    setTextColor(brightness > 128 ? '#000000' : '#FFFFFF');

  }, [red, blue, green, isGradient])

  // ランダムカラーを生成
  const generateRandomColor = (): void => {
    const newRed = Math.floor(Math.random() * 256);
    const newGreen = Math.floor(Math.random() * 256);
    const newBlue = Math.floor(Math.random() * 256);

    setRed(newRed);
    setGreen(newGreen);
    setBlue(newBlue);
  }

  // カラーをリセット
  const resetColors = (): void => {
    // グラデーションをfalseに
    setIsGradient(false);
    setCurrentGradient('');

    setRed(59);
    setGreen(130);
    setBlue(246);
  }

  // プリセットカラーを適用
  const applyPresetColor = (preset: PresetColor): void => {
    // グラデーションを無効化
    setIsGradient(false);
    setCurrentGradient('');

    setBackgroundColor(preset.bg);
    setTextColor(preset.text);
    
    // HEXからRGBに逆変換
    const hex = preset.bg.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    setRed(r);
    setGreen(g);
    setBlue(b);
  };

  const applyGradient = (gradient: GradientPreset): void => {
    // 背景にグラデーションを直接設定
    setIsGradient(true);
    setCurrentGradient(gradient.gradient);
    setTextColor('#FFFFFF');
    setBackgroundColor('グラデーション')

    // RGB値をリセット（グラデーション時は単色ではないため）
    setRed(0);
    setGreen(0);
    setBlue(0);
  }

  return (
    // 背景を着色する
    <div
      className="min-h-screen"
      style={{
        background: isGradient ? currentGradient : backgroundColor,
        color: textColor,
      }}
    >
      {/* ヘッダー */}
      <header className="text-center p-6">
        <h1 className="flex items-center justify-center gap-4">
          <Palette className="w-16 h-16" />
          <p className="text-5xl">色変更アプリ</p>
        </h1>
        <p className="text-2xl">useState で色を自由にコントロール！</p>
      </header>

      {/* メイン */}
      <main>
        <div className="max-w-2xl mx-auto space-y-4 px-4">
          {/* 現在の色 */}
          <section className="max-w-2xl mx-auto rounded-2xl bg-white/30 text-center p-6 space-y-4">
            <h1 className="text-4xl">{backgroundColor}</h1>
            <p className=" text-xl">現在の色: {backgroundColor}</p>

          </section>
          {/* RGBスライダーセクション */}
          <section className="rounded-2xl bg-white/20 backdrop-blue-md p-6">
              <h3 className="text-center font-semibold text-xl mb-6">RGBスライダー</h3>
                <div className="space-y-6">
                  {/* 赤色スライダー */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="font-medium">Red</label>
                      <span>{red}</span>
                    </div>
                    <input 
                      type="range"
                      min="0"
                      max={255}
                      value={red}
                      onChange={(e) => setRed(Number(e.target.value))}
                      className='w-full h-3 bg-red-300 px-3 py-1 rounded font-mono'
                      />
                  </div>

                  {/* 青色スライダー */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="font-medium">blue</label>
                      <span>{blue}</span>
                    </div>
                    <input 
                      type="range"
                      min="0"
                      max={255}
                      value={blue}
                      onChange={(e) => setBlue(Number(e.target.value))}
                      className='w-full h-3 bg-red-300 px-3 py-1 rounded font-mono'
                      />
                  </div>

                  {/* 緑色スライダー */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="font-medium">Green</label>
                      <span>{green}</span>
                    </div>
                    <input 
                      type="range"
                      min="0"
                      max={255}
                      value={green}
                      onChange={(e) => setGreen(Number(e.target.value))}
                      className='w-full h-3 bg-red-300 px-3 py-1 rounded font-mono'
                      />
                  </div>
                </div>
          </section>

          {/* ランダム、リセットボタン */}
          <div className="flex gap-3">
            {/* ランダムボタン */}
            <button
              onClick={generateRandomColor}
              className="flex-1 bg-purple-500 hover:bg-purple-600 py-3 px-4 rounded-xl transition-colors">
              ランダム
            </button>

              {/* リセットボタン */}
            <button
              onClick={resetColors}
              className="flex-1 bg-gray-500 hover:bg-gray-600 py-3 px-4 rounded-xl transition-colors">
              リセット
            </button>
          </div>

          {/* プリセットカラーセクション */}
          <section className="rounded-2xl bg-white/20 backdrop-blur-md p-6">
            <h1 className="text-center text-xl p-4">プリセットカラー</h1>
            <div className="grid grid-cols-4 gap-3">
              {presetColors.map((presetColor, index) => (
                <button
                  key={index}
                  onClick={() => applyPresetColor(presetColor)}
                  style={{
                    backgroundColor: presetColor.bg,
                    color: presetColor.text,
                  }}
                  className="h-16 rounded-xl shadow-lg transition-all hover:shadow-xl hover:scale-110 active:scale-90 font-semibold text-xs"
                >
                  {presetColor.name}
                </button>
              ))}
            </div>
          </section>

          {/* グラデーションセクション */}
          <section className="rounded-2xl bg-white/20 backdrop-blur-md p-6">
            <h1 className="text-center text-xl p-4">グラデーション</h1>
            <div className="grid grid-cols-2 gap-3">
              {gradientPresets.map((gradient, index) => 
                <button
                  key={index}
                  onClick={() => applyGradient(gradient)}
                  className="h-16 rounded-xl transition-all hover: shadow-xl text-white font-medium hover:scale-105 active:scale-95"
                  style={{ background: gradient.gradient}}
                >
                  {gradient.name}
                </button>
              )}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
