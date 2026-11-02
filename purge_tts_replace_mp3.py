import re

files_to_update = [
    '/Users/volodymyrkatasonov/.gemini/antigravity/scratch/islenskukennsla/index-cyberpunk.html',
    '/Users/volodymyrkatasonov/.gemini/antigravity/scratch/islenskukennsla/index-volcanic.html'
]

real_audio_js = '''    /* =========================================================================
       HTML5 REAL MP3 AUDIO PLAYER (PURGED SPEECHSYNTHESIS)
       ========================================================================= */
    const nativeAudioBank = {
      'A': './audio/a.mp3',
      'Á': './audio/a_acute.mp3',
      'B': './audio/b.mp3',
      'D': './audio/d.mp3',
      'Ð': './audio/ed.mp3',        // Pristine native "eð"
      'E': './audio/e.mp3',
      'É': './audio/e_acute.mp3',
      'F': './audio/f.mp3',         // Pristine native "eff"
      'G': './audio/g.mp3',
      'H': './audio/h.mp3',
      'I': './audio/i.mp3',
      'Í': './audio/i_acute.mp3',
      'J': './audio/j.mp3',
      'K': './audio/k.mp3',
      'L': './audio/l.mp3',
      'M': './audio/m.mp3',
      'N': './audio/n.mp3',
      'O': './audio/o.mp3',
      'Ó': './audio/o_acute.mp3',
      'P': './audio/p.mp3',
      'R': './audio/r.mp3',
      'S': './audio/s.mp3',
      'T': './audio/t.mp3',
      'U': './audio/u.mp3',
      'Ú': './audio/u_acute.mp3',
      'V': './audio/v.mp3',
      'X': './audio/x.mp3',
      'Y': './audio/y.mp3',
      'Ý': './audio/y_acute.mp3',
      'Z': './audio/z.mp3',
      'Þ': './audio/thorn.mp3',     // Pristine native "þorn"
      'Æ': './audio/ae.mp3',
      'Ö': './audio/o_umlaut.mp3'
    };

    let currentAudioInstance = null;

    function playRealAudio(letter, cardElement) {
      const key = letter.toUpperCase ? letter.toUpperCase() : letter;
      const audioUrl = nativeAudioBank[key] || nativeAudioBank[letter] || `./audio/${encodeURIComponent(letter)}.mp3`;

      if (!audioUrl) return;

      // Stop previous audio if playing
      if (currentAudioInstance) {
        currentAudioInstance.pause();
        currentAudioInstance.currentTime = 0;
      }

      currentAudioInstance = new Audio(audioUrl);

      if (cardElement) {
        cardElement.classList.add('ring-4', 'ring-amber-400', 'scale-105', 'shadow-2xl');
      }

      currentAudioInstance.play().catch(e => {
        console.log('Audio playback error / local file policy:', e);
        playToneChime(440, 0.2);
      });

      const cleanup = () => {
        if (cardElement) {
          cardElement.classList.remove('ring-4', 'ring-amber-400', 'scale-105', 'shadow-2xl');
        }
      };

      currentAudioInstance.onended = cleanup;
      currentAudioInstance.onerror = () => {
        cleanup();
        playToneChime(440, 0.2);
      };
    }

    // Aliases for seamless compatibility
    function playNativeMaleVoice(text, cardElement) {
      playRealAudio(text, cardElement);
    }

    function playMaleAudio(text, cardElement) {
      playRealAudio(text, cardElement);
    }

    function playVoiceSample(text, cardElement) {
      playRealAudio(text, cardElement);
    }

    function playLetterSound(letter, element) {
      playRealAudio(letter, element);
    }

    function speakLetter(letter, cardElement) {
      playRealAudio(letter, cardElement);
    }

    function speakSelectedLetter(btnElement) {
      playRealAudio(currentSelectedLetter.upper, btnElement);
    }'''

for fpath in files_to_update:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Replace speech synthesis audio engine functions with real audio engine
    # In index-cyberpunk.html or index-volcanic.html, look for audio engine block
    pattern = r'/\* =+[\r\n\s]+(?:2\.\s+)?(?:NATIVE AUDIO ENGINE|MALE VOICE NATIVE AUDIO ENGINE|MALE VOICE ENGINE CONTROLLER)[\s\S]*?function playToneChime'
    match = re.search(pattern, content)
    if match:
        content = content[:match.start()] + real_audio_js + '\n\n    function playToneChime' + content[match.end():]
        print(f'✅ Replaced audio engine in {fpath}')
    else:
        print(f'⚠️ Audio engine pattern not matched in {fpath}')

    # 2. Remove speech onvoiceschanged
    content = re.sub(r'if\s*\(\'speechSynthesis\'\s*in\s*window\)\s*\{[\s\S]*?setTimeout\(updateMaleVoiceBadge,\s*\d+\);\s*\}', '', content)
    content = re.sub(r'if\s*\(\'speechSynthesis\'\s*in\s*window\)\s*\{[\s\S]*?setTimeout\(updateMaleVoiceStatus,\s*\d+\);\s*\}', '', content)

    # 3. Replace any remaining SpeechSynthesis / playNativeMaleVoice / playMaleAudio in markup
    content = re.sub(r'playNativeMaleVoice\(', 'playRealAudio(', content)
    content = re.sub(r'playMaleAudio\(', 'playRealAudio(', content)
    content = re.sub(r'playVoiceSample\(', 'playRealAudio(', content)

    # 4. Update letter selection to call playRealAudio
    content = re.sub(r'playLetterSound\(item\.upper,\s*cardElement\);', 'playRealAudio(item.upper, cardElement);', content)
    content = re.sub(r'speakLetter\(item\.upper,\s*cardElement\);', 'playRealAudio(item.upper, cardElement);', content)

    # 5. Update HUD / Pill badge to show Real MP3 Native Audio
    content = content.replace('Karl / Gunnar (0.80x · 0.88p)', 'Raunveruleg MP3 hljóð (Native Speaker MP3)')
    content = content.replace('Karl / Gunnar (0.82x · 0.90)', 'Raunveruleg MP3 hljóð (Native Speaker MP3)')
    content = content.replace('🎙️ Karl / Gunnar (0.82x · 0.90)', '🔊 Native MP3 Audio')
    content = content.replace('🎙️ Karl / Gunnar (0.80x · 0.88p)', '🔊 Native MP3 Audio')

    # 6. Ensure no window.speechSynthesis remains in the file
    assert 'SpeechSynthesisUtterance' not in content, f'SpeechSynthesisUtterance still found in {fpath}'
    assert 'window.speechSynthesis' not in content, f'window.speechSynthesis still found in {fpath}'

    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'🎉 {fpath} successfully updated and purged of SpeechSynthesis!')
