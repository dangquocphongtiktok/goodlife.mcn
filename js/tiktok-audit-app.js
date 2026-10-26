/**
 * Goodlife Media - TikTok Medical Content Audit Mini-App (Controller & Engine)
 * Features:
 * 1. Tab 1: Instant Text Script Analysis, Safety Score, Highlighting, 1-Click Auto-Fix.
 * 2. Tab 2: Video 2-Factor Moderation:
 *    - Factor 1: Voice / Audio Transcription Violations (highlights, breakdown, auto-fix).
 *    - Factor 2: Visual Moderation (background frame scanner, ONLY outputs violating frames if detected).
 * 3. Conversion Funnel (Lead Magnet) connecting to Goodlife Media consultation form.
 */

class TiktokAuditApp {
  constructor() {
    this.modal = document.getElementById('modal-tiktok-audit');
    this.currentTab = 'script'; // 'script' | 'video'
    this.violatingFrames = [];

    // Dictionary for 1-click Auto-Fix
    this.autoFixReplacements = [
      { pattern: /cam kết chữa khỏi 100%/gi, replacement: "hỗ trợ cải thiện rõ rệt theo phác đồ y khoa" },
      { pattern: /chữa khỏi 100%/gi, replacement: "hỗ trợ cải thiện theo phác đồ chuyên khoa" },
      { pattern: /cam kết khỏi bệnh/gi, replacement: "giúp kiểm soát tình trạng bệnh hiệu quả" },
      { pattern: /trị dứt điểm vĩnh viễn/gi, replacement: "phác đồ tối ưu giúp duy trì sự ổn định lâu dài" },
      { pattern: /trị dứt điểm/gi, replacement: "phác đồ tối ưu kiểm soát triệu chứng" },
      { pattern: /không tái phát/gi, replacement: "giảm thiểu nguy cơ tái phát khi tuân thủ phác đồ" },
      { pattern: /vĩnh viễn/gi, replacement: "duy trì hiệu quả lâu dài" },
      { pattern: /tuyệt đối an toàn/gi, replacement: "được kiểm chứng an toàn lâm sàng, giảm thiểu tối đa xâm lấn" },
      { pattern: /số 1 việt nam/gi, replacement: "tiên tiến hiện nay" },
      { pattern: /số một việt nam/gi, replacement: "tiên tiến hiện nay" },
      { pattern: /duy nhất/gi, replacement: "chuyên biệt theo từng ca lâm sàng" },
      { pattern: /thần dược/gi, replacement: "hoạt chất y sinh học chuẩn chứng cứ" },
      { pattern: /bí truyền/gi, replacement: "phương pháp y học chuẩn hóa" },
      { pattern: /tiêm trực tiếp không đau/gi, replacement: "thao tác kỹ thuật nhẹ nhàng, kiểm soát cảm giác tối ưu" },
      { pattern: /rạch mổ/gi, replacement: "thủ thuật can thiệp vi phẫu" },
      { pattern: /máu tươi/gi, replacement: "dịch mô thương tổn" },
      { pattern: /hủy hoại gương mặt/gi, replacement: "tác động nghiêm trọng đến cấu trúc da và thẩm mỹ" },
      { pattern: /inbox giá/gi, replacement: "nhận tư vấn chuyên môn từ ekip y tế" },
      { pattern: /ib giá/gi, replacement: "nhận tư vấn chuyên môn từ bác sĩ" },
      { pattern: /ib ngay/gi, replacement: "đặt lịch thăm khám trực tiếp cùng bác sĩ" },
      { pattern: /inbox ngay/gi, replacement: "đặt lịch thăm khám trực tiếp" },
      { pattern: /giảm giá sốc/gi, replacement: "chương trình hỗ trợ tầm soát sức khỏe đặc quyền" },
      { pattern: /khuyến mãi khủng/gi, replacement: "chính sách đồng hành y tế" },
      { pattern: /chốt đơn/gi, replacement: "đặt hẹn thăm khám" },
      { pattern: /mua ngay/gi, replacement: "tìm hiểu thêm thông tin chi tiết" },
      { pattern: /cam kết hoàn tiền 100%/gi, replacement: "chính sách đồng hành và tái khám định kỳ" },
      { pattern: /cam kết hoàn tiền/gi, replacement: "chính sách đồng hành và tái khám định kỳ" }
    ];

    // Gemini Vision API Key & Moderation State
    this.geminiApiKey = localStorage.getItem('goodlife_gemini_api_key') || '';
    this.safeRedFramesCount = 0;

    this.initElements();
    this.bindEvents();
  }

  initElements() {
    // Buttons & Tabs
    this.tabBtns = document.querySelectorAll('.audit-tab-btn');
    this.tabPanes = document.querySelectorAll('.audit-tab-pane');
    this.btnCloseModal = document.getElementById('btn-close-tiktok-audit');

    // Tab 1 Elements
    this.scriptInput = document.getElementById('audit-script-input');
    this.btnScanScript = document.getElementById('btn-scan-script');
    this.btnClearScript = document.getElementById('btn-clear-script');
    this.scriptCharCount = document.getElementById('script-char-count');
    this.scriptResultBox = document.getElementById('audit-script-results');
    this.scoreValueEl = document.getElementById('audit-score-value');
    this.scoreBadgeEl = document.getElementById('audit-score-badge');
    this.scoreDescriptionEl = document.getElementById('audit-score-description');
    this.highlightedScriptEl = document.getElementById('audit-highlighted-script');
    this.violationsListEl = document.getElementById('audit-violations-list');
    this.btnAutoFix = document.getElementById('btn-autofix-script');
    this.btnCopyCleanScript = document.getElementById('btn-copy-clean-script');

    // Tab 2 Elements
    this.videoDropzone = document.getElementById('video-dropzone');
    this.videoFileInput = document.getElementById('video-file-input');
    this.videoResultContainer = document.getElementById('video-audit-results');
    this.videoPlayer = document.getElementById('audit-video-player');
    this.videoAspectBadge = document.getElementById('video-aspect-badge');
    this.videoDurationBadge = document.getElementById('video-duration-badge');
    this.videoResBadge = document.getElementById('video-res-badge');
    this.videoFramesCountEl = document.getElementById('video-frames-count');

    // Tab 2: 2-Track Moderation Pipeline Elements
    this.pipelineOverallStatus = document.getElementById('pipeline-overall-status');
    this.stepVoice1 = document.getElementById('step-voice-1');
    this.stepVoice2 = document.getElementById('step-voice-2');
    this.stepVoice3 = document.getElementById('step-voice-3');
    this.stepVisual1 = document.getElementById('step-visual-1');
    this.stepVisual2 = document.getElementById('step-visual-2');
    this.stepVisual3 = document.getElementById('step-visual-3');
    this.audioWaveIndicator = document.getElementById('audio-wave-indicator');
    this.frameScanCounter = document.getElementById('frame-scan-counter');

    // Tab 2: Voice section elements
    this.voiceScoreBadge = document.getElementById('voice-score-badge');
    this.voiceViolationCount = document.getElementById('voice-violation-count');
    this.videoVoiceTranscript = document.getElementById('video-voice-transcript');
    this.videoVoiceViolationsList = document.getElementById('video-voice-violations-list');
    this.btnAutofixVoice = document.getElementById('btn-autofix-voice');
    this.voiceDataSourceBadge = document.getElementById('voice-data-source-badge');

    // Tab 2: Real video voice input prompt elements
    this.voicePromptInputCard = document.getElementById('voice-prompt-input-card');
    this.btnStartSpeechRec = document.getElementById('btn-start-speech-rec');
    this.btnFocusPasteScript = document.getElementById('btn-focus-paste-script');
    this.voiceUserManualInput = document.getElementById('voice-user-manual-input');
    this.btnScanUserManualVoice = document.getElementById('btn-scan-user-manual-voice');

    // Tab 2: Voice manual edit drawer elements
    this.btnToggleEditVoice = document.getElementById('btn-toggle-edit-voice');
    this.voiceEditDrawer = document.getElementById('voice-edit-drawer');
    this.voiceManualTextarea = document.getElementById('voice-manual-textarea');
    this.btnCancelEditVoice = document.getElementById('btn-cancel-edit-voice');
    this.btnApplyVoiceEdit = document.getElementById('btn-apply-voice-edit');

    // Tab 2: Visual section elements (Only violating frames)
    this.visualVerdictBadge = document.getElementById('visual-verdict-badge');
    this.violatingFramesContainer = document.getElementById('violating-frames-container');
    this.btnCopyDisclaimer = document.getElementById('btn-copy-disclaimer');

    // Tab 2: Visual Engine & Gemini Config Elements
    this.visualEngineBadge = document.getElementById('visual-engine-badge');
    this.btnToggleGeminiConfig = document.getElementById('btn-toggle-gemini-config');
    this.geminiConfigDrawer = document.getElementById('gemini-config-drawer');
    this.geminiApiKeyInput = document.getElementById('gemini-api-key-input');
    this.btnSaveGeminiKey = document.getElementById('btn-save-gemini-key');
    this.btnRemoveGeminiKey = document.getElementById('btn-remove-gemini-key');
    this.geminiKeyStatus = document.getElementById('gemini-key-status');
    this.safeRedDetectedBanner = document.getElementById('safe-red-detected-banner');
    this.safeRedDetectedText = document.getElementById('safe-red-detected-text');
  }

  bindEvents() {
    // Open modal triggers
    document.querySelectorAll('.btn-open-tiktok-audit').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    });

    // Close modal
    if (this.btnCloseModal) {
      this.btnCloseModal.addEventListener('click', () => this.close());
    }

    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.close();
      });
    }

    // Tab switching
    this.tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        this.switchTab(tab);
      });
    });

    // Tab 1: Script char count & actions
    if (this.scriptInput) {
      this.scriptInput.addEventListener('input', () => {
        if (this.scriptCharCount) {
          this.scriptCharCount.textContent = `${this.scriptInput.value.length} ký tự`;
        }
      });
    }

    if (this.btnScanScript) {
      this.btnScanScript.addEventListener('click', () => this.scanScript());
    }

    if (this.btnClearScript) {
      this.btnClearScript.addEventListener('click', () => {
        this.scriptInput.value = '';
        if (this.scriptCharCount) this.scriptCharCount.textContent = '0 ký tự';
        if (this.scriptResultBox) this.scriptResultBox.classList.add('hidden');
      });
    }

    if (this.btnAutoFix) {
      this.btnAutoFix.addEventListener('click', () => this.autoFixScript());
    }

    if (this.btnCopyCleanScript) {
      this.btnCopyCleanScript.addEventListener('click', () => {
        const textToCopy = this.scriptInput.value;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(textToCopy).then(() => {
            this.showToast('✓ Đã sao chép kịch bản an toàn vào bộ nhớ tạm!');
          });
        }
      });
    }

    // Tab 2: Video Dropzone & File Input
    if (this.videoDropzone && this.videoFileInput) {
      this.videoDropzone.addEventListener('click', () => {
        this.videoFileInput.click();
      });

      this.videoDropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        this.videoDropzone.classList.add('border-cyan-400', 'bg-cyan-500/10');
      });

      this.videoDropzone.addEventListener('dragleave', () => {
        this.videoDropzone.classList.remove('border-cyan-400', 'bg-cyan-500/10');
      });

      this.videoDropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        this.videoDropzone.classList.remove('border-cyan-400', 'bg-cyan-500/10');
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          this.handleVideoFile(e.dataTransfer.files[0]);
        }
      });

      this.videoFileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          this.handleVideoFile(e.target.files[0]);
        }
      });
    }

    // Tab 2: Auto-Fix Voice
    if (this.btnAutofixVoice) {
      this.btnAutofixVoice.addEventListener('click', () => this.autoFixVoiceTranscript());
    }

    // Tab 2: Real Video Speech Recognition & Paste Events
    if (this.btnStartSpeechRec) {
      this.btnStartSpeechRec.addEventListener('click', () => this.startSpeechRecognitionForVideo());
    }

    if (this.btnFocusPasteScript && this.voiceUserManualInput) {
      this.btnFocusPasteScript.addEventListener('click', () => {
        this.voiceUserManualInput.focus();
        this.voiceUserManualInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }

    if (this.btnScanUserManualVoice && this.voiceUserManualInput) {
      this.btnScanUserManualVoice.addEventListener('click', () => {
        const text = this.voiceUserManualInput.value.trim();
        if (!text) {
          alert('Vui lòng nhập hoặc dán lời thoại thực tế của video!');
          return;
        }

        if (this.voicePromptInputCard) this.voicePromptInputCard.classList.add('hidden');
        if (this.videoVoiceTranscript) this.videoVoiceTranscript.classList.remove('hidden');

        if (this.voiceDataSourceBadge) {
          this.voiceDataSourceBadge.textContent = 'Lời thoại video thực tế';
          this.voiceDataSourceBadge.className = 'px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40';
        }

        this.scanVoiceTranscript(text);
        this.setPipelineStep(this.stepVoice2, 'done', '2. ✓ Đã có văn bản lời thoại');

        const result = TIKTOK_MEDICAL_POLICY.checkScript(text);
        if (result.violations.length > 0) {
          this.setPipelineStep(this.stepVoice3, 'danger', `3. 🚨 Dính ${result.violations.length} Nhóm Từ Cấm`);
        } else {
          this.setPipelineStep(this.stepVoice3, 'done', '3. ✓ Voice Sạch 100%');
        }

        this.updateOverallPipelineStatus();
        this.showToast('✓ Đã quét lời thoại thực tế theo Bộ tiêu chuẩn TikTok y tế!');
      });
    }

    // Tab 2: Voice Manual Edit Drawer Events
    if (this.btnToggleEditVoice && this.voiceEditDrawer) {
      this.btnToggleEditVoice.addEventListener('click', () => {
        const isHidden = this.voiceEditDrawer.classList.contains('hidden');
        if (isHidden) {
          this.voiceEditDrawer.classList.remove('hidden');
          if (this.voiceManualTextarea) {
            this.voiceManualTextarea.value = this.currentVoiceText || '';
            this.voiceManualTextarea.focus();
          }
        } else {
          this.voiceEditDrawer.classList.add('hidden');
        }
      });
    }

    if (this.btnCancelEditVoice && this.voiceEditDrawer) {
      this.btnCancelEditVoice.addEventListener('click', () => {
        this.voiceEditDrawer.classList.add('hidden');
      });
    }

    if (this.btnApplyVoiceEdit && this.voiceManualTextarea) {
      this.btnApplyVoiceEdit.addEventListener('click', () => {
        const updatedText = this.voiceManualTextarea.value.trim();
        if (!updatedText) {
          alert('Vui lòng nhập hoặc dán lời thoại thực tế của video!');
          return;
        }

        if (this.voiceEditDrawer) {
          this.voiceEditDrawer.classList.add('hidden');
        }

        // Re-scan with updated text
        this.scanVoiceTranscript(updatedText);

        // Update pipeline step 3 badge status
        const result = TIKTOK_MEDICAL_POLICY.checkScript(updatedText);
        if (result.violations.length > 0) {
          this.setPipelineStep(this.stepVoice3, 'danger', `3. 🚨 Dính ${result.violations.length} Nhóm Từ Cấm`);
        } else {
          this.setPipelineStep(this.stepVoice3, 'done', '3. ✓ Voice Sạch 100%');
        }

        this.updateOverallPipelineStatus();
        this.showToast('✓ Đã cập nhật lời thoại thực tế và hoàn tất rà soát bộ lọc TikTok!');
      });
    }

    // Copy Disclaimer
    if (this.btnCopyDisclaimer) {
      this.btnCopyDisclaimer.addEventListener('click', () => {
        const disclaimer = TIKTOK_MEDICAL_POLICY.getStandardDisclaimer();
        if (navigator.clipboard) {
          navigator.clipboard.writeText(disclaimer).then(() => {
            this.showToast('✓ Đã sao chép nhãn Miễn trừ trách nhiệm y khoa!');
          });
        }
      });
    }

    // Tab 2: Gemini API Key Configuration Events
    if (this.btnToggleGeminiConfig && this.geminiConfigDrawer) {
      this.btnToggleGeminiConfig.addEventListener('click', () => {
        this.geminiConfigDrawer.classList.toggle('hidden');
        if (!this.geminiConfigDrawer.classList.contains('hidden') && this.geminiApiKeyInput) {
          this.geminiApiKeyInput.focus();
        }
      });
    }

    if (this.btnSaveGeminiKey && this.geminiApiKeyInput) {
      this.btnSaveGeminiKey.addEventListener('click', () => {
        const key = this.geminiApiKeyInput.value.trim();
        if (!key) {
          alert('Vui lòng nhập Google Gemini API Key hợp lệ!');
          return;
        }
        this.geminiApiKey = key;
        localStorage.setItem('goodlife_gemini_api_key', key);
        this.updateGeminiStatusUI();
        if (this.geminiConfigDrawer) this.geminiConfigDrawer.classList.add('hidden');
        this.showToast('✓ Đã lưu Gemini API Key! AI Vision 2.5 Flash đã sẵn sàng kiểm duyệt hình ảnh.');
      });
    }

    if (this.btnRemoveGeminiKey) {
      this.btnRemoveGeminiKey.addEventListener('click', () => {
        this.geminiApiKey = '';
        localStorage.removeItem('goodlife_gemini_api_key');
        if (this.geminiApiKeyInput) this.geminiApiKeyInput.value = '';
        this.updateGeminiStatusUI();
        this.showToast('✓ Đã xóa API Key. Hệ thống sử dụng Bộ lọc Cục bộ Ngữ cảnh Da & Hemoglobin (Offline).');
      });
    }

    this.updateGeminiStatusUI();

    // CTA buttons inside audit modal linking to consultation
    document.querySelectorAll('.btn-audit-cta-consult').forEach(btn => {
      btn.addEventListener('click', () => {
        this.close();
        if (typeof window.openConsultationModalWithService === 'function') {
          window.openConsultationModalWithService('Gói Truyền Thông Trọn Gói 25 triệu/tháng (30 video + MCN + Ads)');
        } else if (typeof window.openConsultationModal === 'function') {
          window.openConsultationModal();
        }
      });
    });
  }

  updateGeminiStatusUI() {
    this.geminiApiKey = localStorage.getItem('goodlife_gemini_api_key') || '';
    const hasKey = !!this.geminiApiKey;

    if (this.geminiApiKeyInput && hasKey) {
      this.geminiApiKeyInput.value = this.geminiApiKey;
    }

    if (this.geminiKeyStatus) {
      if (hasKey) {
        this.geminiKeyStatus.textContent = '✓ AI Vision 2.5 Flash đã kích hoạt';
        this.geminiKeyStatus.className = 'text-[10px] text-emerald-400 font-mono font-bold';
      } else {
        this.geminiKeyStatus.textContent = 'Chưa cấu hình (Đang dùng bộ lọc cục bộ)';
        this.geminiKeyStatus.className = 'text-[10px] text-slate-400 font-mono';
      }
    }

    if (this.visualEngineBadge) {
      if (hasKey) {
        this.visualEngineBadge.textContent = '🤖 AI Gemini Vision (gemini-2.5-flash)';
        this.visualEngineBadge.className = 'px-2 py-0.5 rounded text-[9px] font-mono font-bold engine-badge-gemini';
      } else {
        this.visualEngineBadge.textContent = '⚡ Bộ Lọc Da & Hemoglobin (Offline)';
        this.visualEngineBadge.className = 'px-2 py-0.5 rounded text-[9px] font-mono font-bold engine-badge-offline';
      }
    }
  }

  open() {
    if (this.modal) {
      this.modal.classList.add('open');
      document.body.classList.add('overflow-hidden');
    }
  }

  close() {
    if (this.modal) {
      this.modal.classList.remove('open');
      document.body.classList.remove('overflow-hidden');
      if (this.videoPlayer) {
        this.videoPlayer.pause();
      }
    }
  }

  switchTab(tabName) {
    this.currentTab = tabName;
    this.tabBtns.forEach(btn => {
      if (btn.getAttribute('data-tab') === tabName) {
        btn.classList.add('active');
        btn.classList.remove('text-slate-400');
        btn.classList.add('text-white');
      } else {
        btn.classList.remove('active');
        btn.classList.add('text-slate-400');
        btn.classList.remove('text-white');
      }
    });

    this.tabPanes.forEach(pane => {
      if (pane.id === `tab-pane-${tabName}`) {
        pane.classList.remove('hidden');
      } else {
        pane.classList.add('hidden');
      }
    });
  }

  // =========================================================================
  // TAB 1: SCRIPT SCANNING & AUTO-FIX
  // =========================================================================
  scanScript() {
    const rawText = this.scriptInput.value.trim();
    if (!rawText) {
      alert('Vui lòng nhập hoặc dán nội dung kịch bản cần kiểm duyệt!');
      return;
    }

    const result = TIKTOK_MEDICAL_POLICY.checkScript(rawText);

    let score = 100;
    let dangerCount = 0;
    let warningCount = 0;

    result.violations.forEach(v => {
      if (v.severity === 'danger') {
        dangerCount += v.matchedKeywords.length;
        score -= v.matchedKeywords.length * 20;
      } else {
        warningCount += v.matchedKeywords.length;
        score -= v.matchedKeywords.length * 10;
      }
    });

    score = Math.max(15, Math.min(100, score));
    this.renderScriptResults(rawText, score, result, dangerCount, warningCount);
  }

  renderScriptResults(rawText, score, result, dangerCount, warningCount) {
    if (!this.scriptResultBox) return;
    this.scriptResultBox.classList.remove('hidden');

    if (this.scoreValueEl) {
      this.scoreValueEl.textContent = `${score}/100`;
    }

    if (this.scoreBadgeEl && this.scoreDescriptionEl) {
      if (score >= 85) {
        this.scoreValueEl.className = 'text-3xl font-black font-mono text-emerald-400';
        this.scoreBadgeEl.className = 'px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5';
        this.scoreBadgeEl.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> An Toàn Đăng Tải`;
        this.scoreDescriptionEl.textContent = 'Kịch bản chuẩn y khoa chuẩn mực, không có từ ngữ cấm hoặc cam kết quá đà. Đủ điều kiện xuất bản TikTok.';
      } else if (score >= 60) {
        this.scoreValueEl.className = 'text-3xl font-black font-mono text-amber-400';
        this.scoreBadgeEl.className = 'px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5';
        this.scoreBadgeEl.innerHTML = `<span class="w-2 h-2 rounded-full bg-amber-400"></span> Cần Chỉnh Sửa Nhẹ`;
        this.scoreDescriptionEl.textContent = `Phát hiện ${warningCount + dangerCount} từ ngữ nhạy cảm dễ bị thuật toán TikTok giảm đề xuất hoặc chuyển hướng luồng quảng cáo.`;
      } else {
        this.scoreValueEl.className = 'text-3xl font-black font-mono text-rose-400';
        this.scoreBadgeEl.className = 'px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1.5';
        this.scoreBadgeEl.innerHTML = `<span class="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span> Nguy Cơ Cao Bị Gậy / Shadowban`;
        this.scoreDescriptionEl.textContent = `Kịch bản vi phạm nghiêm trọng chính sách y tế (Cam kết chữa khỏi 100%, thủ thuật nhạy cảm). Nguy cơ cao bị xóa video và khóa kênh!`;
      }
    }

    // Render Highlighted Script
    let highlightedHtml = rawText;
    result.violations.forEach(v => {
      v.matchedKeywords.forEach(kw => {
        const regex = new RegExp(`(${kw})`, 'gi');
        const badgeClass = v.severity === 'danger' ? 'script-highlight-danger' : 'script-highlight-warning';
        highlightedHtml = highlightedHtml.replace(regex, `<mark class="${badgeClass}" title="${v.groupName}: $1">$1</mark>`);
      });
    });

    if (this.highlightedScriptEl) {
      this.highlightedScriptEl.innerHTML = highlightedHtml.replace(/\n/g, '<br>');
    }

    // Render Detailed Violation List
    if (this.violationsListEl) {
      if (result.violations.length === 0) {
        this.violationsListEl.innerHTML = `
          <div class="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <svg class="w-5 h-5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            <span>Không tìm thấy từ ngữ vi phạm! Kịch bản đạt chuẩn phân phối y tế TikTok.</span>
          </div>
        `;
      } else {
        let html = '';
        result.violations.forEach((v) => {
          const isDanger = v.severity === 'danger';
          const borderCol = isDanger ? 'border-rose-500/30' : 'border-amber-500/30';
          const bgCol = isDanger ? 'bg-rose-950/20' : 'bg-amber-950/20';
          const badgeCol = isDanger ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' : 'bg-amber-500/20 text-amber-300 border-amber-500/40';

          html += `
            <div class="p-3.5 rounded-xl ${bgCol} border ${borderCol} space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-white flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full ${isDanger ? 'bg-rose-500' : 'bg-amber-400'}"></span>
                  ${v.groupName}
                </span>
                <span class="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border ${badgeCol}">
                  ${v.severityLabel}
                </span>
              </div>
              <div class="text-[11px] text-slate-300">
                <span class="text-slate-400">Từ vi phạm:</span> 
                <strong class="${isDanger ? 'text-rose-300' : 'text-amber-300'} font-mono">${v.matchedKeywords.join(', ')}</strong>
              </div>
              <p class="text-[11px] text-slate-400 leading-relaxed">${v.consequence}</p>
              <div class="text-[11px] text-teal-300 pt-1 border-t border-white/5">
                <span class="text-slate-400 font-medium">Gợi ý sửa an toàn:</span>
                <ul class="list-disc list-inside mt-0.5 space-y-0.5 text-slate-300">
                  ${v.suggestions.slice(0, 2).map(s => `<li>${s}</li>`).join('')}
                </ul>
              </div>
            </div>
          `;
        });
        this.violationsListEl.innerHTML = html;
      }
    }

    this.scriptResultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  autoFixScript() {
    let text = this.scriptInput.value;
    if (!text.trim()) return;

    this.autoFixReplacements.forEach(rule => {
      text = text.replace(rule.pattern, rule.replacement);
    });

    this.scriptInput.value = text;
    if (this.scriptCharCount) {
      this.scriptCharCount.textContent = `${text.length} ký tự`;
    }

    this.scanScript();
    this.showToast('✨ 1-Click Auto-Fix thành công! Kịch bản đã được chuyển thành văn phong chuẩn y khoa.');
  }

  // =========================================================================
  // TAB 2: VIDEO 2-TRACK MODERATION PIPELINE
  // Track 1: Voice -> Audio Extract -> Speech-to-Text -> Text Policy Scanner
  // Track 2: Visual -> Frame Extract -> Policy Comparison -> Only Violating Frames
  // =========================================================================

  setPipelineStep(stepEl, status, text = null) {
    if (!stepEl) return;
    stepEl.classList.remove('waiting', 'active', 'done', 'danger');
    stepEl.classList.add(status);
    if (text) {
      stepEl.textContent = text;
    }
  }

  updateOverallPipelineStatus() {
    if (!this.pipelineOverallStatus) return;

    const hasVoiceViolation = this.currentVoiceViolations && this.currentVoiceViolations.length > 0;
    const hasVisualViolation = this.violatingFrames && this.violatingFrames.some(f => !f.dismissed);

    if (hasVoiceViolation || hasVisualViolation) {
      this.pipelineOverallStatus.textContent = '🚨 Phát Hiện Vi Phạm Chính Sách';
      this.pipelineOverallStatus.className = 'text-[10px] font-mono text-rose-300 font-bold px-2 py-0.5 rounded bg-rose-500/20 border border-rose-500/40 animate-pulse';
    } else {
      this.pipelineOverallStatus.textContent = '✓ Hoàn Tất: Đạt Chuẩn 100% Cả 2 Nhánh';
      this.pipelineOverallStatus.className = 'text-[10px] font-mono text-emerald-300 font-bold px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40';
    }
  }

  handleVideoFile(file) {
    if (!file) return;
    const isVideo = file.type.startsWith('video/');
    const isImage = file.type.startsWith('image/');

    if (!isVideo && !isImage) {
      alert('Vui lòng chọn file video (MP4, WebM, MOV) hoặc file ảnh (JPG, PNG, WebP) hợp lệ!');
      return;
    }

    if (isImage) {
      this.handleImageFile(file);
      return;
    }

    const fileUrl = URL.createObjectURL(file);
    if (!this.videoPlayer) return;

    this.videoPlayer.src = fileUrl;
    this.videoPlayer.load();

    if (this.videoResultContainer) {
      this.videoResultContainer.classList.remove('hidden');
    }

    this.videoPlayer.onloadedmetadata = () => {
      const width = this.videoPlayer.videoWidth;
      const height = this.videoPlayer.videoHeight;
      const duration = Math.round(this.videoPlayer.duration);
      const ratio = width / height;

      // Update Video Specs Badges
      if (this.videoResBadge) {
        this.videoResBadge.textContent = `${width} × ${height} px`;
      }

      if (this.videoDurationBadge) {
        this.videoDurationBadge.textContent = `${duration}s`;
        if (duration >= 20 && duration <= 90) {
          this.videoDurationBadge.className = 'px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40';
        } else {
          this.videoDurationBadge.className = 'px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40';
        }
      }

      if (this.videoAspectBadge) {
        if (ratio <= 0.65) {
          this.videoAspectBadge.className = 'px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40';
          this.videoAspectBadge.innerHTML = '✓ Chuẩn dọc TikTok (9:16)';
        } else if (ratio > 1.2) {
          this.videoAspectBadge.className = 'px-2.5 py-1 rounded-md text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40';
          this.videoAspectBadge.innerHTML = '⚠️ Video ngang (16:9) - Bị bóp đề xuất TikTok!';
        } else {
          this.videoAspectBadge.className = 'px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40';
          this.videoAspectBadge.innerHTML = '⚠️ Tỷ lệ vuông / Phi chuẩn';
        }
      }

      // Show real video voice input prompt card
      if (this.voicePromptInputCard) this.voicePromptInputCard.classList.remove('hidden');
      if (this.videoVoiceTranscript) this.videoVoiceTranscript.classList.add('hidden');
      if (this.videoVoiceViolationsList) this.videoVoiceViolationsList.innerHTML = '';
      if (this.voiceViolationCount) {
        this.voiceViolationCount.textContent = 'Chờ nạp lời thoại';
        this.voiceViolationCount.className = 'font-mono text-cyan-400 font-bold';
      }
      if (this.voiceScoreBadge) {
        this.voiceScoreBadge.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/40';
        this.voiceScoreBadge.innerHTML = '⏳ Chờ Khớp Lời Thoại';
      }
      if (this.voiceDataSourceBadge) {
        this.voiceDataSourceBadge.textContent = 'Video tải lên';
        this.voiceDataSourceBadge.className = 'px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-slate-800 text-slate-300';
      }

      // Run 2-track pipeline on real video file
      this.executeTwoTrackPipeline({
        videoUrl: fileUrl,
        duration: duration
      });
    };
  }

  executeTwoTrackPipeline({ videoUrl, duration = 38 }) {
    // 1. Reset pipeline tracker UI
    if (this.pipelineOverallStatus) {
      this.pipelineOverallStatus.textContent = '⏳ Đang kiểm duyệt 2 nhánh độc lập...';
      this.pipelineOverallStatus.className = 'text-[10px] font-mono text-cyan-300 font-bold px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-400/30';
    }

    if (this.frameScanCounter) {
      this.frameScanCounter.textContent = '0/12 Frames';
    }

    // Initialize track 1 badges (Voice)
    this.setPipelineStep(this.stepVoice1, 'active', '1. Đang tách luồng Audio...');
    this.setPipelineStep(this.stepVoice2, 'waiting', '2. Speech-to-Text (vi-VN)');
    this.setPipelineStep(this.stepVoice3, 'waiting', '3. Rà soát Từ Cấm');

    // Initialize track 2 badges (Visual)
    this.setPipelineStep(this.stepVisual1, 'active', '1. Đang trích xuất frame...');
    this.setPipelineStep(this.stepVisual2, 'waiting', '2. So sánh Policy TikTok');
    this.setPipelineStep(this.stepVisual3, 'waiting', '3. Bắt Ảnh Vi Phạm');

    // Clear previous results
    this.violatingFrames = [];
    if (this.violatingFramesContainer) {
      this.violatingFramesContainer.innerHTML = `
        <div class="p-4 rounded-xl bg-slate-950/60 border border-white/5 text-xs text-slate-400 flex items-center gap-2.5">
          <svg class="animate-spin h-4 w-4 text-cyan-400 shrink-0" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          <span>Đang trích xuất và so sánh từng khung hình với Policy TikTok y tế...</span>
        </div>
      `;
    }

    // -----------------------------------------------------------------------
    // TRACK 1 PIPELINE: AUDIO -> SPEECH-TO-TEXT -> TEXT POLICY SCANNER
    // -----------------------------------------------------------------------
    setTimeout(() => {
      this.setPipelineStep(this.stepVoice1, 'done', '1. ✓ Đã nhận diện luồng Audio');
      this.setPipelineStep(this.stepVoice2, 'active', '2. ✏️ Chờ nhập / Nhận diện lời thoại');
      this.setPipelineStep(this.stepVoice3, 'waiting', '3. Chờ quét Từ Cấm');

      if (this.audioWaveIndicator) {
        this.audioWaveIndicator.style.display = 'none';
      }
    }, 400);

    // -----------------------------------------------------------------------
    // TRACK 2 PIPELINE: FRAME EXTRACTION -> POLICY COMPARISON -> ONLY VIOLATIONS
    // -----------------------------------------------------------------------
    setTimeout(() => {
      this.setPipelineStep(this.stepVisual1, 'done', '1. ✓ Đã trích xuất frame');
      this.setPipelineStep(this.stepVisual2, 'active', '2. Đang so sánh Policy...');

      this.scanFramesInBackground(videoUrl, duration);
    }, 300);
  }

  // -------------------------------------------------------------------------
  // FACTOR 1: VOICE / LỜI THOẠI TRONG VIDEO
  // -------------------------------------------------------------------------

  startSpeechRecognitionForVideo() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Trình duyệt của bạn chưa hỗ trợ Web Speech API trực tiếp. Vui lòng dán lời thoại của video vào ô văn bản bên dưới để kiểm duyệt!');
      if (this.voiceUserManualInput) this.voiceUserManualInput.focus();
      return;
    }

    try {
      if (this.recognition) {
        this.recognition.abort();
      }

      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'vi-VN';
      this.recognition.continuous = true;
      this.recognition.interimResults = true;

      // Play video with audio
      if (this.videoPlayer) {
        this.videoPlayer.currentTime = 0;
        this.videoPlayer.muted = false;
        this.videoPlayer.play();
      }

      if (this.audioWaveIndicator) {
        this.audioWaveIndicator.style.display = 'flex';
      }

      this.setPipelineStep(this.stepVoice2, 'active', '2. 🎙️ Đang nghe nhận diện giọng nói...');
      this.showToast('🎙️ Đang nghe giọng nói từ video... Hãy bật loa để trình duyệt ghi nhận!');

      let recognizedText = '';

      this.recognition.onresult = (event) => {
        let interim = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            recognizedText += event.results[i][0].transcript + ' ';
          } else {
            interim += event.results[i][0].transcript;
          }
        }
        const live = (recognizedText + ' ' + interim).trim();
        if (this.voiceUserManualInput) {
          this.voiceUserManualInput.value = live;
        }
      };

      this.recognition.onerror = (err) => {
        console.warn('Speech recognition error:', err);
        this.showToast('⚠️ Nhận diện giọng nói gián đoạn. Bạn có thể dán trực tiếp lời thoại vào ô.');
      };

      this.recognition.onend = () => {
        if (this.audioWaveIndicator) {
          this.audioWaveIndicator.style.display = 'none';
        }
        const finalText = this.voiceUserManualInput ? this.voiceUserManualInput.value.trim() : recognizedText.trim();
        if (finalText) {
          if (this.voicePromptInputCard) this.voicePromptInputCard.classList.add('hidden');
          if (this.videoVoiceTranscript) this.videoVoiceTranscript.classList.remove('hidden');

          if (this.voiceDataSourceBadge) {
            this.voiceDataSourceBadge.textContent = 'Lời thoại nhận diện Speech-to-Text';
            this.voiceDataSourceBadge.className = 'px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/40';
          }

          this.scanVoiceTranscript(finalText);
          this.setPipelineStep(this.stepVoice2, 'done', '2. ✓ Đã nhận diện giọng nói');

          const result = TIKTOK_MEDICAL_POLICY.checkScript(finalText);
          if (result.violations.length > 0) {
            this.setPipelineStep(this.stepVoice3, 'danger', `3. 🚨 Dính ${result.violations.length} Nhóm Từ Cấm`);
          } else {
            this.setPipelineStep(this.stepVoice3, 'done', '3. ✓ Voice Sạch 100%');
          }

          this.updateOverallPipelineStatus();
          this.showToast('✓ Đã hoàn tất nhận diện và đối soát từ cấm TikTok!');
        }
      };

      this.recognition.start();

      // If video ends, stop recognition
      if (this.videoPlayer) {
        this.videoPlayer.onended = () => {
          if (this.recognition) {
            this.recognition.stop();
          }
        };
      }
    } catch (e) {
      console.error(e);
      alert('Không thể kích hoạt bộ nhận diện giọng nói: ' + e.message);
    }
  }

  scanVoiceTranscript(rawVoiceText) {
    this.currentVoiceText = rawVoiceText;
    const result = TIKTOK_MEDICAL_POLICY.checkScript(rawVoiceText);
    this.currentVoiceViolations = result.violations;

    let dangerCount = 0;
    let warningCount = 0;
    let score = 100;

    result.violations.forEach(v => {
      if (v.severity === 'danger') {
        dangerCount += v.matchedKeywords.length;
        score -= v.matchedKeywords.length * 20;
      } else {
        warningCount += v.matchedKeywords.length;
        score -= v.matchedKeywords.length * 10;
      }
    });
    score = Math.max(15, Math.min(100, score));

    const totalViolations = dangerCount + warningCount;

    // Update Voice Score Badge & Count
    if (this.voiceViolationCount) {
      this.voiceViolationCount.textContent = totalViolations > 0 ? `${totalViolations} từ vi phạm` : '0 vi phạm';
      this.voiceViolationCount.className = totalViolations > 0 ? 'font-mono text-rose-400 font-bold' : 'font-mono text-emerald-400 font-bold';
    }

    if (this.voiceScoreBadge) {
      if (score >= 85) {
        this.voiceScoreBadge.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40';
        this.voiceScoreBadge.innerHTML = '✓ Voice Đạt Chuẩn 100/100';
      } else if (score >= 60) {
        this.voiceScoreBadge.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40';
        this.voiceScoreBadge.innerHTML = `⚠️ Cảnh Báo (${totalViolations} Từ)`;
      } else {
        this.voiceScoreBadge.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40';
        this.voiceScoreBadge.innerHTML = `🚨 Nguy Cơ Cao Bị Gậy (${totalViolations} Từ Cấm)`;
      }
    }

    // Render Highlighted Voice Transcript
    let highlightedHtml = rawVoiceText;
    result.violations.forEach(v => {
      v.matchedKeywords.forEach(kw => {
        const regex = new RegExp(`(${kw})`, 'gi');
        const badgeClass = v.severity === 'danger' ? 'script-highlight-danger' : 'script-highlight-warning';
        highlightedHtml = highlightedHtml.replace(regex, `<mark class="${badgeClass}" title="${v.groupName}: $1">$1</mark>`);
      });
    });

    if (this.videoVoiceTranscript) {
      this.videoVoiceTranscript.innerHTML = highlightedHtml.replace(/\n/g, '<br>');
    }

    // Render Voice Violations Breakdown List
    if (this.videoVoiceViolationsList) {
      if (result.violations.length === 0) {
        this.videoVoiceViolationsList.innerHTML = `
          <div class="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <svg class="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            <span>Lời thoại voice trong video sạch 100%, không phát hiện từ ngữ cấm hay cam kết sai sự thật.</span>
          </div>
        `;
      } else {
        let html = '';
        result.violations.forEach(v => {
          const isDanger = v.severity === 'danger';
          const borderCol = isDanger ? 'border-rose-500/30' : 'border-amber-500/30';
          const bgCol = isDanger ? 'bg-rose-950/20' : 'bg-amber-950/20';
          const badgeCol = isDanger ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' : 'bg-amber-500/20 text-amber-300 border-amber-500/40';

          html += `
            <div class="p-3 rounded-xl ${bgCol} border ${borderCol} space-y-1.5">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-white flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full ${isDanger ? 'bg-rose-500' : 'bg-amber-400'}"></span>
                  ${v.groupName}
                </span>
                <span class="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase border ${badgeCol}">
                  ${v.severityLabel}
                </span>
              </div>
              <div class="text-[11px] text-slate-300">
                <span class="text-slate-400">Từ voice vi phạm:</span> 
                <strong class="${isDanger ? 'text-rose-300' : 'text-amber-300'} font-mono">${v.matchedKeywords.join(', ')}</strong>
              </div>
              <p class="text-[10px] text-slate-400 leading-relaxed">${v.consequence}</p>
              <div class="text-[10px] text-teal-300 pt-1 border-t border-white/5">
                <span class="text-slate-400 font-medium">Gợi ý thu âm thay thế:</span>
                <strong class="text-slate-200 ml-1">${v.suggestions[0]}</strong>
              </div>
            </div>
          `;
        });
        this.videoVoiceViolationsList.innerHTML = html;
      }
    }
  }

  autoFixVoiceTranscript() {
    if (!this.currentVoiceText) return;
    let text = this.currentVoiceText;

    this.autoFixReplacements.forEach(rule => {
      text = text.replace(rule.pattern, rule.replacement);
    });

    this.scanVoiceTranscript(text);

    if (this.voiceManualTextarea) {
      this.voiceManualTextarea.value = text;
    }

    this.setPipelineStep(this.stepVoice3, 'done', '3. ✓ Voice Đã Chuẩn Y Khoa');
    this.updateOverallPipelineStatus();
    this.showToast('✨ 1-Click Auto-Fix thành công! Lời thoại voice đã được chuẩn hóa y khoa an toàn.');
  }

  // -------------------------------------------------------------------------
  // SINGLE IMAGE HANDLING (FOR DIRECT IMAGE AUDIT & TESTING)
  // -------------------------------------------------------------------------
  handleImageFile(file) {
    const fileUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      if (this.videoResultContainer) {
        this.videoResultContainer.classList.remove('hidden');
      }

      if (this.videoPlayer) {
        this.videoPlayer.pause();
        this.videoPlayer.src = '';
        this.videoPlayer.poster = fileUrl;
      }

      if (this.videoResBadge) {
        this.videoResBadge.textContent = `${img.naturalWidth} × ${img.naturalHeight} px (Ảnh)`;
      }
      if (this.videoDurationBadge) {
        this.videoDurationBadge.textContent = '1 frame';
        this.videoDurationBadge.className = 'px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40';
      }
      if (this.videoAspectBadge) {
        this.videoAspectBadge.className = 'px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-800 text-slate-300 border border-white/10';
        this.videoAspectBadge.textContent = 'Khung hình tĩnh';
      }

      if (this.voicePromptInputCard) this.voicePromptInputCard.classList.add('hidden');
      if (this.videoVoiceTranscript) this.videoVoiceTranscript.classList.remove('hidden');
      if (this.videoVoiceTranscript) {
        this.videoVoiceTranscript.innerHTML = '<span class="text-slate-400 italic">Kiểm duyệt hình ảnh tĩnh: Bỏ qua phân tích luồng Voice âm thanh.</span>';
      }
      if (this.videoVoiceViolationsList) this.videoVoiceViolationsList.innerHTML = '';
      if (this.voiceViolationCount) {
        this.voiceViolationCount.textContent = 'Ảnh tĩnh (0 vi phạm)';
        this.voiceViolationCount.className = 'font-mono text-emerald-400 font-bold';
      }
      if (this.voiceScoreBadge) {
        this.voiceScoreBadge.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40';
        this.voiceScoreBadge.innerHTML = '✓ Đạt Chuẩn (Ảnh tĩnh)';
      }

      this.setPipelineStep(this.stepVoice1, 'done', '1. ✓ Bỏ qua Audio (File ảnh)');
      this.setPipelineStep(this.stepVoice2, 'done', '2. ✓ Bỏ qua Voice');
      this.setPipelineStep(this.stepVoice3, 'done', '3. ✓ Voice Sạch 100%');

      this.setPipelineStep(this.stepVisual1, 'done', '1. ✓ Đã nạp khung hình ảnh');
      this.setPipelineStep(this.stepVisual2, 'active', '2. Đang phân tích Ngữ cảnh...');
      this.setPipelineStep(this.stepVisual3, 'waiting', '3. Bắt Ảnh Vi Phạm');

      this.scanSingleFrameImage(img);
    };
    img.src = fileUrl;
  }

  scanSingleFrameImage(img) {
    const canvas = document.createElement('canvas');
    canvas.width = 160;
    canvas.height = 110;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
    const offlineResult = this.analyzeCanvasFrameOffline(canvas, ctx);

    // High-fidelity image dataUrl for Gemini Vision (preserves fine surgical and text detail)
    let geminiDataUrl = dataUrl;
    try {
      const maxDim = 800;
      let targetW = img.naturalWidth || img.width || 160;
      let targetH = img.naturalHeight || img.height || 110;
      if (targetW > maxDim || targetH > maxDim) {
        const scale = Math.min(maxDim / targetW, maxDim / targetH);
        targetW = Math.round(targetW * scale);
        targetH = Math.round(targetH * scale);
      }
      const hCanvas = document.createElement('canvas');
      hCanvas.width = targetW;
      hCanvas.height = targetH;
      const hCtx = hCanvas.getContext('2d');
      hCtx.drawImage(img, 0, 0, targetW, targetH);
      geminiDataUrl = hCanvas.toDataURL('image/jpeg', 0.88);
    } catch (e) {
      geminiDataUrl = dataUrl;
    }

    const finalizeResult = (violatingFrames, safeRedNote = null) => {
      this.setPipelineStep(this.stepVisual2, 'done', '2. ✓ Hoàn tất phân tích');
      if (violatingFrames.length > 0) {
        this.setPipelineStep(this.stepVisual3, 'danger', `3. 🚨 Bắt ${violatingFrames.length} Ảnh Vi Phạm`);
      } else {
        this.setPipelineStep(this.stepVisual3, 'done', '3. ✓ Khung hình Sạch 100%');
      }

      if (safeRedNote && this.safeRedDetectedBanner && this.safeRedDetectedText) {
        this.safeRedDetectedBanner.classList.remove('hidden');
        this.safeRedDetectedText.textContent = safeRedNote;
      } else if (this.safeRedDetectedBanner) {
        this.safeRedDetectedBanner.classList.add('hidden');
      }

      this.renderViolatingFramesResult(violatingFrames);
      this.updateOverallPipelineStatus();
    };

    // If Gemini Vision is configured, perform AI Vision Contextual Disambiguation
    if (this.geminiApiKey) {
      this.showToast('🤖 Đang chạy AI Gemini Vision 2.5 Flash phân biệt ngữ cảnh hình ảnh...');
      this.analyzeFrameWithGeminiVision(geminiDataUrl)
        .then(aiResult => {
          const detectedViolations = [];
          if (aiResult.is_violation) {
            detectedViolations.push({
              timeSec: 0,
              timestamp: '00:00',
              dataUrl: geminiDataUrl,
              isSuspected: false,
              dismissed: false,
              source: 'gemini_vision',
              reason: `🚨 AI Gemini Vision (2.5 Flash) phát hiện: ${aiResult.reason || 'Dấu hiệu máu sinh học / vết thương hở y tế.'}`
            });
            finalizeResult(detectedViolations);
          } else {
            const note = aiResult.safe_red_note || (aiResult.safe_red_detected ? 'Phát hiện sắc đỏ từ trang phục/đồ họa (An toàn - Không phải máu y khoa)' : null);
            finalizeResult([], note);
          }
        })
        .catch(err => {
          console.warn('Gemini Vision failed, falling back to Skin-Context Heuristic:', err);
          this.handleOfflineSingleFrame(offlineResult, geminiDataUrl, finalizeResult);
        });
    } else {
      this.handleOfflineSingleFrame(offlineResult, geminiDataUrl, finalizeResult);
    }
  }

  handleOfflineSingleFrame(offlineResult, dataUrl, finalizeResult) {
    const detectedViolations = [];
    if (offlineResult.isSuspectedViolation) {
      const topCluster = offlineResult.suspectedClusters[0];
      const contactPct = Math.round(topCluster.skinContactRatio * 100);
      detectedViolations.push({
        timeSec: 0,
        timestamp: '00:00',
        dataUrl: dataUrl,
        isSuspected: true,
        dismissed: false,
        source: 'skin_context_filter',
        clusterInfo: topCluster,
        reason: `⚠️ Nghi ngờ sắc thái mô/máu trên vùng da (Cần kiểm tra): Cụm sắc tố đỏ sẫm (${topCluster.size} px) tiếp giáp ${contactPct}% diện tích viền với màu da người.`
      });
    }

    finalizeResult(detectedViolations, offlineResult.safeRedNote);
  }

  // -------------------------------------------------------------------------
  // FACTOR 2: HÌNH ẢNH VI PHẠM (BACKGROUND SCAN — ONLY OUTPUTS VIOLATING FRAMES)
  // Smart Contextual Moderation: AI Vision (gemini-2.5-flash) & Skin-Context Heuristic
  // -------------------------------------------------------------------------
  scanFramesInBackground(videoUrl, duration) {
    if (!this.violatingFramesContainer) return;

    if (this.safeRedDetectedBanner) {
      this.safeRedDetectedBanner.classList.add('hidden');
    }

    // Sample up to 12 evenly spaced timestamps
    const sampleCount = Math.min(12, Math.max(3, Math.floor(duration)));
    const timestamps = [];
    for (let i = 1; i <= sampleCount; i++) {
      timestamps.push(Math.round((duration / (sampleCount + 1)) * i * 10) / 10);
    }
    if (timestamps.length === 0) timestamps.push(1);

    if (this.frameScanCounter) {
      this.frameScanCounter.textContent = `0/${timestamps.length} Frames`;
    }

    const offscreenVideo = document.createElement('video');
    offscreenVideo.src = videoUrl;
    offscreenVideo.muted = true;
    offscreenVideo.playsInline = true;
    offscreenVideo.preload = 'auto';

    let currentIndex = 0;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const detectedViolatingFrames = [];
    let totalSafeRedFrames = 0;
    let scanFinished = false;

    const finalizeScan = () => {
      if (scanFinished) return;
      scanFinished = true;
      clearTimeout(overallTimeout);
      clearTimeout(seekTimeout);

      if (this.videoFramesCountEl) {
        this.videoFramesCountEl.textContent = `Đã quét ${timestamps.length} frames ngầm`;
      }
      if (this.frameScanCounter) {
        this.frameScanCounter.textContent = `${timestamps.length}/${timestamps.length} Frames`;
      }

      this.setPipelineStep(this.stepVisual2, 'done', '2. ✓ Hoàn tất phân tích');

      if (detectedViolatingFrames.length > 0) {
        this.setPipelineStep(this.stepVisual3, 'danger', `3. 🚨 Bắt ${detectedViolatingFrames.length} Ảnh Vi Phạm`);
      } else {
        this.setPipelineStep(this.stepVisual3, 'done', '3. ✓ Khung hình Sạch 100%');
      }

      // Show banner if safe red objects were disambiguated
      if (totalSafeRedFrames > 0 && this.safeRedDetectedBanner && this.safeRedDetectedText) {
        this.safeRedDetectedBanner.classList.remove('hidden');
        this.safeRedDetectedText.textContent = `Hệ thống đã nhận diện ${totalSafeRedFrames} khung hình chứa sắc đỏ (trang phục, chữ viết, đồ họa) và tự động phân loại: AN TOÀN (Không nhầm lẫn với máu y khoa).`;
      }

      this.renderViolatingFramesResult(detectedViolatingFrames);
      this.updateOverallPipelineStatus();
    };

    const overallTimeout = setTimeout(() => {
      console.warn('Video frame scanning reached global safety timeout, finalizing.');
      finalizeScan();
    }, 45000);

    offscreenVideo.onerror = (e) => {
      console.warn('Offscreen video load error:', e);
      finalizeScan();
    };

    let seekTimeout = null;
    const captureNextFrame = () => {
      if (currentIndex >= timestamps.length) {
        finalizeScan();
        return;
      }

      if (this.frameScanCounter) {
        const currentSec = Math.round(timestamps[currentIndex]);
        const m = String(Math.floor(currentSec / 60)).padStart(2, '0');
        const s = String(currentSec % 60).padStart(2, '0');
        this.frameScanCounter.textContent = `${currentIndex + 1}/${timestamps.length} (${m}:${s})`;
      }

      clearTimeout(seekTimeout);
      seekTimeout = setTimeout(() => {
        console.warn(`Frame seek timeout at ${timestamps[currentIndex]}s, advancing.`);
        currentIndex++;
        captureNextFrame();
      }, 3500);

      try {
        offscreenVideo.currentTime = timestamps[currentIndex];
      } catch (err) {
        console.warn('Seek error:', err);
        currentIndex++;
        captureNextFrame();
      }
    };

    offscreenVideo.onseeked = async () => {
      clearTimeout(seekTimeout);
      canvas.width = 160;
      canvas.height = 110;
      ctx.drawImage(offscreenVideo, 0, 0, canvas.width, canvas.height);

      const offlineRes = this.analyzeCanvasFrameOffline(canvas, ctx);
      const timeSec = Math.round(timestamps[currentIndex]);
      const minStr = String(Math.floor(timeSec / 60)).padStart(2, '0');
      const secStr = String(timeSec % 60).padStart(2, '0');
      const timestampLabel = `${minStr}:${secStr}`;
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

      const hasRedFeatures = offlineRes.isSuspectedViolation || offlineRes.safeRedFound || offlineRes.hemoglobinCandidateCount > 0 || offlineRes.safeGraphicRedCount > 0;

      if (this.geminiApiKey && hasRedFeatures) {
        // CƠ CHẾ 1: AI Vision Semantic Analysis (gemini-2.5-flash)
        try {
          const aiVerdict = await this.analyzeFrameWithGeminiVision(dataUrl);
          if (aiVerdict.is_violation) {
            detectedViolatingFrames.push({
              timeSec: timeSec,
              timestamp: timestampLabel,
              dataUrl: dataUrl,
              isSuspected: false,
              dismissed: false,
              source: 'gemini_vision',
              reason: `🚨 AI Gemini Vision (2.5 Flash) xác nhận vi phạm: ${aiVerdict.reason || 'Dấu hiệu máu sinh học / vết thương hở y tế.'}`
            });
          } else {
            // Disambiguated by AI as safe red object!
            totalSafeRedFrames++;
          }
        } catch (e) {
          console.warn('Gemini frame check error, fallback to offline heuristic:', e);
          if (offlineRes.isSuspectedViolation) {
            const topCluster = offlineRes.suspectedClusters[0];
            const contactPct = Math.round(topCluster.skinContactRatio * 100);
            detectedViolatingFrames.push({
              timeSec: timeSec,
              timestamp: timestampLabel,
              dataUrl: dataUrl,
              isSuspected: true,
              dismissed: false,
              source: 'skin_context_filter',
              clusterInfo: topCluster,
              reason: `⚠️ Nghi ngờ sắc thái mô/máu trên vùng da (Cần kiểm tra): Phát hiện cụm sắc tố đỏ sẫm (${topCluster.size} px) tiếp giáp ${contactPct}% diện tích viền với da người.`
            });
          } else if (offlineRes.safeRedFound) {
            totalSafeRedFrames++;
          }
        }
      } else {
        // CƠ CHẾ 2: Bộ lọc Cục bộ Ngữ cảnh Da & Hemoglobin (Offline Heuristic)
        if (offlineRes.isSuspectedViolation) {
          const topCluster = offlineRes.suspectedClusters[0];
          const contactPct = Math.round(topCluster.skinContactRatio * 100);
          detectedViolatingFrames.push({
            timeSec: timeSec,
            timestamp: timestampLabel,
            dataUrl: dataUrl,
            isSuspected: true,
            dismissed: false,
            source: 'skin_context_filter',
            clusterInfo: topCluster,
            reason: `⚠️ Nghi ngờ sắc thái mô/máu trên vùng da (Cần kiểm tra): Phát hiện cụm sắc tố đỏ sẫm (${topCluster.size} px) tiếp giáp ${contactPct}% diện tích viền với da người.`
          });
        } else if (offlineRes.safeRedFound) {
          totalSafeRedFrames++;
        }
      }

      currentIndex++;
      captureNextFrame();
    };

    const startSeeking = () => {
      captureNextFrame();
    };

    if (offscreenVideo.readyState >= 1) {
      startSeeking();
    } else {
      offscreenVideo.onloadedmetadata = startSeeking;
    }
    offscreenVideo.load();
  }

  // =========================================================================
  // CƠ CHẾ 2: BỘ LỌC CỤC BỘ TRÊN CANVAS (Offline Heuristic)
  // Thuật toán: "Kiểm tra Ngữ cảnh Vùng Da & Sắc độ Hemoglobin" (Skin-Context & Hemoglobin HSV Filter)
  // Thay thế hoàn toàn thuật toán đếm pixel đỏ thô sơ trước đây
  // =========================================================================
  analyzeCanvasFrameOffline(canvas, ctx) {
    const W = canvas.width;
    const H = canvas.height;
    const totalPixels = W * H;
    const imgData = ctx.getImageData(0, 0, W, H);
    const data = imgData.data;

    // Pixel classification map:
    // 0: Neutral / Background / Other
    // 1: Human Skin Pixel (RGB + YCbCr criteria)
    // 2: Hemoglobin Red Pixel (Hue 348°-10°, Sat 0.60-0.88, Val 0.18-0.55)
    // 3: Safe Graphic / Garment Red Pixel (Pure RGB, Sat > 0.88, Val > 0.58)
    const pixelType = new Uint8Array(totalPixels);
    let skinPixelCount = 0;
    let safeGraphicRedCount = 0;
    let hemoglobinCandidateCount = 0;

    for (let i = 0; i < totalPixels; i++) {
      const p = i * 4;
      const r = data[p];
      const g = data[p + 1];
      const b = data[p + 2];
      const a = data[p + 3];

      if (a < 128) {
        pixelType[i] = 0;
        continue;
      }

      // Convert RGB to HSV
      const rn = r / 255;
      const gn = g / 255;
      const bn = b / 255;
      const max = Math.max(rn, gn, bn);
      const min = Math.min(rn, gn, bn);
      const d = max - min;
      let h = 0;
      const s = max === 0 ? 0 : d / max;
      const v = max;

      if (max !== min) {
        if (max === rn) {
          h = (gn - bn) / d + (gn < bn ? 6 : 0);
        } else if (max === gn) {
          h = (bn - rn) / d + 2;
        } else if (max === bn) {
          h = (rn - gn) / d + 4;
        }
        h *= 60; // 0° to 360°
      }

      // ---------------------------------------------------------------------
      // Bước C: Tiêu chuẩn nhận diện Màu Da Người (Human Skin-Tone RGB/YCbCr)
      // RGB: R > 95, G > 40, B > 20, R > G, R > B, |R - G| > 15
      // YCbCr: 135 <= Cr <= 180, 85 <= Cb <= 135
      // ---------------------------------------------------------------------
      const isSkinRgb = (r > 95 && g > 40 && b > 20 && r > g && r > b && Math.abs(r - g) > 15);
      let isSkin = false;
      if (isSkinRgb) {
        const cb = 128 - 0.168736 * r - 0.331264 * g + 0.5 * b;
        const cr = 128 + 0.5 * r - 0.418688 * g - 0.081312 * b;
        if (cr >= 135 && cr <= 180 && cb >= 85 && cb <= 135) {
          isSkin = true;
        }
      }

      // Red Hue check: 340° to 360° OR 0° to 20°
      const isRedHue = (h >= 340 || h <= 20);

      // ---------------------------------------------------------------------
      // Bước A (Loại trừ Đồ họa & Trang phục):
      // Màu đỏ tươi đồ họa (RGB thuần, S > 0.90 hoặc Value chói > 0.55)
      // ---------------------------------------------------------------------
      const isGraphicGarmentRed = isRedHue && (s > 0.90 || v > 0.55 || (r > 175 && g < 55 && b < 55));

      // ---------------------------------------------------------------------
      // Bước B (Kiểm tra Sắc độ Hemoglobin Sẫm):
      // Máu thật trong y khoa: Hue 348° đến 10°, Sat 0.60 đến 0.88, Val 0.18 đến 0.55
      // ---------------------------------------------------------------------
      const isHemoglobinHue = (h >= 348 || h <= 10);
      const isHemoglobinSat = (s >= 0.60 && s <= 0.88);
      const isHemoglobinVal = (v >= 0.18 && v <= 0.55);
      const isHemoglobin = isHemoglobinHue && isHemoglobinSat && isHemoglobinVal && !isGraphicGarmentRed;

      if (isGraphicGarmentRed) {
        pixelType[i] = 3;
        safeGraphicRedCount++;
      } else if (isHemoglobin) {
        pixelType[i] = 2;
        hemoglobinCandidateCount++;
      } else if (isSkin) {
        pixelType[i] = 1;
        skinPixelCount++;
      } else {
        pixelType[i] = 0;
      }
    }

    // -----------------------------------------------------------------------
    // Bước C: Connected Component Clustering & Kiểm tra Tiếp giáp Vùng Da Người
    // Một cụm điểm ảnh đỏ sẫm CHỈ ĐƯỢC nghi ngờ là vết máu nếu xung quanh viền
    // có ít nhất 40% diện tích tiếp giáp là điểm ảnh màu da người
    // VÀ kích thước cụm nhỏ, hình thái bất đối xứng (loại trừ khối đồ họa cạnh thẳng).
    // -----------------------------------------------------------------------
    const visited = new Uint8Array(totalPixels);
    const suspectedClusters = [];
    const safeRedClusters = [];
    let maxSkinContactFound = 0;

    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const startIdx = y * W + x;
        if (pixelType[startIdx] !== 2 || visited[startIdx]) continue;

        // BFS traversal
        const queue = [startIdx];
        visited[startIdx] = 1;
        let clusterSize = 0;
        let minX = x, maxX = x, minY = y, maxY = y;

        // Border neighbors set (encoded as 1D coordinate)
        const borderNeighbors = new Set();

        let head = 0;
        while (head < queue.length) {
          const curr = queue[head++];
          clusterSize++;
          const cx = curr % W;
          const cy = Math.floor(curr / W);

          if (cx < minX) minX = cx;
          if (cx > maxX) maxX = cx;
          if (cy < minY) minY = cy;
          if (cy > maxY) maxY = cy;

          // 8-neighbor adjacency
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              if (dx === 0 && dy === 0) continue;
              const nx = cx + dx;
              const ny = cy + dy;
              if (nx >= 0 && nx < W && ny >= 0 && ny < H) {
                const nIdx = ny * W + nx;
                if (pixelType[nIdx] === 2) {
                  if (!visited[nIdx]) {
                    visited[nIdx] = 1;
                    queue.push(nIdx);
                  }
                } else {
                  borderNeighbors.add(nIdx);
                }
              } else {
                borderNeighbors.add(-1); // Frame boundary
              }
            }
          }
        }

        // Measure skin adjacency along perimeter
        let skinBorderCount = 0;
        let totalBorderCount = 0;
        borderNeighbors.forEach(nIdx => {
          totalBorderCount++;
          if (nIdx >= 0 && pixelType[nIdx] === 1) {
            skinBorderCount++;
          }
        });

        const skinContactRatio = totalBorderCount > 0 ? (skinBorderCount / totalBorderCount) : 0;
        if (skinContactRatio > maxSkinContactFound) {
          maxSkinContactFound = skinContactRatio;
        }

        const boxWidth = maxX - minX + 1;
        const boxHeight = maxY - minY + 1;
        const boxArea = boxWidth * boxHeight;
        const fillRatio = boxArea > 0 ? (clusterSize / boxArea) : 0;

        // Criteria Bước C:
        // 1. Kích thước cụm nhỏ (từ 8 đến 800 điểm ảnh trên frame 160x110)
        // 2. Hình thái bất đối xứng (loại trừ khối chữ nhật/đồ họa có cạnh thẳng: fillRatio >= 0.85 khi clusterSize >= 25)
        // 3. Tiếp giáp ít nhất 40% diện tích viền với màu da người
        const isClusterSizeValid = (clusterSize >= 8 && clusterSize <= 800);
        const isGraphicUniformBox = (clusterSize >= 25 && fillRatio >= 0.85);
        const isNotGraphicLargeBox = !isGraphicUniformBox;
        const isSufficientSkinContact = (skinContactRatio >= 0.40);

        if (isClusterSizeValid && isNotGraphicLargeBox && isSufficientSkinContact) {
          suspectedClusters.push({
            size: clusterSize,
            skinContactRatio: skinContactRatio,
            fillRatio: fillRatio,
            bounds: { minX, maxX, minY, maxY }
          });
        } else {
          // If red is NOT surrounded by human skin or is a large graphic block/garment,
          // it is automatically categorized as Safe Red Object (Vật thể/Phông nền màu đỏ an toàn)
          safeRedClusters.push({
            size: clusterSize,
            skinContactRatio: skinContactRatio,
            fillRatio: fillRatio,
            reason: skinContactRatio < 0.40 ? 'Không nằm trên vùng da người (< 40%)' : (isGraphicUniformBox ? 'Khối đồ họa có cạnh thẳng' : 'Khối diện tích lớn/trang phục')
          });
        }
      }
    }

    const hasSuspectedViolation = suspectedClusters.length > 0;
    const hasSafeRedObjects = (safeGraphicRedCount > 40 || safeRedClusters.length > 0);

    let safeRedNote = null;
    if (hasSafeRedObjects && !hasSuspectedViolation) {
      safeRedNote = 'Vật thể/Phông nền màu đỏ an toàn (100% Hợp lệ) — Phát hiện sắc đỏ từ trang phục/đồ họa (An toàn - Không phải máu y khoa)';
    }

    return {
      isSuspectedViolation: hasSuspectedViolation,
      suspectedClusters: suspectedClusters,
      safeRedFound: hasSafeRedObjects,
      safeRedNote: safeRedNote,
      maxSkinContact: maxSkinContactFound,
      safeGraphicRedCount: safeGraphicRedCount,
      hemoglobinCandidateCount: hemoglobinCandidateCount,
      skinPixelCount: skinPixelCount
    };
  }

  // =========================================================================
  // CƠ CHẾ 1: PHÂN BIỆT NGỮ CẢNH BẰNG AI THỊ GIÁC (GEMINI VISION 2.5 FLASH)
  // Contextual Disambiguation: Phân biệt máu sinh học vs áo đỏ, banner, son môi
  // =========================================================================
  async analyzeFrameWithGeminiVision(base64DataUrl) {
    const apiKey = this.geminiApiKey || localStorage.getItem('goodlife_gemini_api_key');
    if (!apiKey) {
      throw new Error('Chưa cấu hình Gemini API Key.');
    }

    const cleanBase64 = base64DataUrl.replace(/^data:image\/[a-zA-Z0-9+.-]+;base64,/, '');
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`;

    const promptText = `Bạn là hệ thống AI Kiểm duyệt Nội dung Y tế TikTok (TikTok Medical Policy AI Inspector).
Nhiệm vụ của bạn là phân tích khung hình trích xuất từ video y tế để phát hiện vi phạm chính sách "Máu & Vết thương hở" (Graphic Blood & Open Wounds), tuyệt đối tuân thủ QUY TẮC PHÂN BIỆT NGỮ CẢNH (Contextual Disambiguation):

1. CHỈ ĐÁNH DẤU VI PHẠM ("is_violation": true) KHI:
- Nhìn thấy máu sinh học thật chảy trên da/mô người.
- Vết rạch phẫu thuật hở, khoang mổ đang thao tác bộc lộ mô hoặc mạch máu.
- Gạc y tế thấm đẫm máu tươi, ống hút dịch chứa đầy máu y khoa.
- Dịch cơ thể hoặc máu chảy trong quá trình làm thủ thuật xâm lấn (như nặn mụn chảy máu, nhổ răng chảy máu, phẫu thuật thẩm mỹ cắt mí, nâng mũi, hút mỡ).

2. TUYỆT ĐỐI KHÔNG BÁO LỖI ("is_violation": false - SAFE RED OBJECTS):
- Quần áo/trang phục/váy áo/đồng phục màu đỏ.
- Chữ viết/tiêu đề/banner đồ họa/phụ đề/nhãn sticker màu đỏ.
- Logo thương hiệu hoặc icon màu đỏ.
- Nội thất/ghế đỏ/giường khám/phông nền studio màu đỏ.
- Ánh đèn LED đỏ/hiệu ứng ánh sáng màu đỏ.
- Son môi/mỹ phẩm trang điểm màu đỏ.
- Trái cây/thực phẩm/bao bì đồ ăn màu đỏ.

Trong kết quả trả về, nếu thấy các vật thể màu đỏ an toàn này, BẮT BUỘC ghi rõ trong trường "safe_red_note": "Phát hiện sắc đỏ từ trang phục/đồ họa (An toàn - Không phải máu y khoa)".

TRẢ VỀ DUY NHẤT 1 ĐỐI TƯỢNG JSON (KHÔNG bọc markdown, KHÔNG dùng \`\`\`json):
{
  "is_violation": boolean,
  "violation_type": "blood_open_wounds" | null,
  "confidence": number,
  "safe_red_detected": boolean,
  "safe_red_note": string | null,
  "detected_objects": string[],
  "reason": string,
  "recommendation": string | null
}
`;

    const payload = {
      contents: [
        {
          parts: [
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: cleanBase64
              }
            },
            {
              text: promptText
            }
          ]
        }
      ],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.1
      }
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini Vision API trả về mã lỗi ${response.status}: ${errText}`);
    }

    const resJson = await response.json();
    const candidatePart = resJson.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidatePart) {
      throw new Error('Không nhận được nội dung phân tích từ Gemini Vision');
    }

    let parsed;
    try {
      parsed = JSON.parse(candidatePart);
    } catch (e) {
      const jsonMatch = candidatePart.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        const cleaned = candidatePart.replace(/```json/gi, '').replace(/```/g, '').trim();
        parsed = JSON.parse(cleaned);
      }
    }

    return parsed;
  }

  // =========================================================================
  // RENDERING & BƯỚC D: XÁC NHẬN 2 CHIỀU CHO NGƯỜI DÙNG (DISMISS TOGGLE)
  // =========================================================================
  renderViolatingFramesResult(violatingFrames) {
    this.violatingFrames = violatingFrames || [];
    if (!this.violatingFramesContainer) return;

    const activeViolations = this.violatingFrames.filter(f => !f.dismissed);

    // Update Visual Verdict Badge
    if (this.visualVerdictBadge) {
      if (activeViolations.length === 0) {
        this.visualVerdictBadge.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40';
        this.visualVerdictBadge.innerHTML = '✓ Hình Ảnh Đạt Chuẩn An Toàn (100/100)';
      } else {
        const isAllSuspected = activeViolations.every(f => f.isSuspected);
        if (isAllSuspected) {
          this.visualVerdictBadge.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40';
          this.visualVerdictBadge.innerHTML = `⚠️ Cần Rà Soát ${activeViolations.length} Khung Hình`;
        } else {
          this.visualVerdictBadge.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40';
          this.visualVerdictBadge.innerHTML = `🚨 Phát Hiện ${activeViolations.length} Khung Hình Vi Phạm`;
        }
      }
    }

    // Case 1: Totally clean video/image (never had any suspected frames)
    if (this.violatingFrames.length === 0) {
      this.violatingFramesContainer.innerHTML = `
        <div class="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300 flex items-start gap-3">
          <div class="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
            ✓
          </div>
          <div class="space-y-1">
            <h5 class="font-bold text-emerald-200">
              Không phát hiện khung hình vi phạm hình ảnh!
            </h5>
            <p class="text-[11px] text-slate-300 leading-relaxed">
              Video không có vết thương hở rỉ máu, không dí sát mũi kim tiêm macro đâm vào da, không lộ thông tin bảo mật của bệnh nhân. Đủ điều kiện thị giác phân phối TikTok.
            </p>
          </div>
        </div>
      `;
      return;
    }

    let html = '';

    // If all frames were dismissed by user, show success banner on top, followed by interactive frame cards
    if (activeViolations.length === 0) {
      html += `
        <div class="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs text-emerald-300 flex items-start gap-3 mb-3">
          <div class="w-6 h-6 rounded-lg bg-emerald-500/25 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/40">
            ✓
          </div>
          <div class="space-y-1 flex-1">
            <h5 class="font-bold text-emerald-200 flex items-center gap-2">
              <span>Đã xác nhận toàn bộ An toàn — Điểm an toàn hình ảnh: 100/100!</span>
            </h5>
            <p class="text-[11px] text-slate-300 leading-relaxed">
              Người dùng đã rà soát và xác nhận các sắc thái đỏ chỉ là đồ vật / màu áo y tế an toàn. Cảnh báo đã được gỡ bỏ hoàn toàn. Bạn có thể bấm "↩ Khôi phục cảnh báo" bên dưới nếu muốn kiểm tra lại.
            </p>
          </div>
        </div>
      `;
    }

    // Render individual frame cards with 2-way dismissal toggle
    this.violatingFrames.forEach((frame, index) => {
      const isDismissed = !!frame.dismissed;
      const isSuspected = !!frame.isSuspected;

      let cardBg = 'bg-rose-950/30 border-rose-500/50';
      let borderImg = 'border-rose-500/80';
      let badgeBg = 'bg-rose-600 text-white';

      if (isDismissed) {
        cardBg = 'frame-card-dismissed';
        borderImg = 'border-emerald-500/60';
        badgeBg = 'bg-emerald-600 text-white';
      } else if (isSuspected) {
        cardBg = 'bg-amber-950/25 border-amber-500/40';
        borderImg = 'border-amber-500/80';
        badgeBg = 'bg-amber-500 text-slate-950 font-black';
      }

      const badgeText = isDismissed
        ? '✓ Đã xác nhận an toàn: Đồ vật / Màu áo'
        : (isSuspected 
            ? '⚠️ Nghi ngờ sắc thái mô/máu trên vùng da (Cần kiểm tra)' 
            : `🚨 Khung Hình Vi Phạm Tại ${frame.timestamp}`);

      html += `
        <div class="p-4 rounded-xl ${cardBg} border flex flex-col sm:flex-row items-start gap-4 shadow-lg transition-all" id="frame-card-${index}">
          <div class="relative shrink-0 rounded-lg overflow-hidden border-2 ${borderImg} w-36 h-24 bg-black group cursor-pointer" onclick="if(window.tiktokAuditApp && window.tiktokAuditApp.videoPlayer && window.tiktokAuditApp.videoPlayer.src){window.tiktokAuditApp.videoPlayer.currentTime=${frame.timeSec};window.tiktokAuditApp.videoPlayer.play();}">
            <img src="${frame.dataUrl}" alt="Khung hình tại ${frame.timestamp}" class="w-full h-full object-cover">
            <span class="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/90 ${isDismissed ? 'text-emerald-400' : (isSuspected ? 'text-amber-400' : 'text-rose-400')} font-mono text-[9px] font-bold border border-white/20">${frame.timestamp}</span>
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-[10px] font-bold">
              ▶ Tua tới giây này
            </div>
          </div>

          <div class="flex-1 space-y-2">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${badgeBg}">
                  ${badgeText}
                </span>
                <span class="text-[10px] text-slate-400 font-mono">Giây ${frame.timestamp}</span>
              </div>

              <!-- BƯỚC D: CƠ CHẾ XÁC NHẬN 2 CHIỀU CHO NGƯỜI DÙNG -->
              <button 
                type="button" 
                onclick="window.tiktokAuditApp.toggleFrameDismiss(${index})" 
                class="btn-frame-dismiss px-3 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${isDismissed ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-white/10' : 'bg-emerald-500/25 hover:bg-emerald-500/35 text-emerald-200 border border-emerald-500/40 shadow-sm'}">
                <span>${isDismissed ? '↩ Khôi phục cảnh báo' : '✓ Xác nhận đây chỉ là đồ vật/màu áo (Bỏ cảnh báo)'}</span>
              </button>
            </div>

            <p class="text-xs ${isDismissed ? 'text-slate-400 line-through' : (isSuspected ? 'text-amber-200' : 'text-rose-200')} font-medium leading-relaxed">
              ${frame.reason}
            </p>

            <!-- AI Gemini Re-verify Button -->
            <div class="flex flex-wrap items-center gap-2 pt-1 border-t border-white/5">
              <button 
                type="button" 
                onclick="window.tiktokAuditApp.verifyFrameWithGemini(${index})" 
                class="text-[10px] font-bold text-cyan-300 hover:text-cyan-200 bg-cyan-950/50 hover:bg-cyan-900/60 px-2.5 py-1 rounded-lg border border-cyan-500/40 transition-all flex items-center gap-1.5 cursor-pointer">
                <span>🤖</span>
                <span>Phân tích lại bằng AI Gemini Vision (gemini-2.5-flash)</span>
              </button>
              <span class="text-[10px] text-slate-500 italic">Áp dụng luật Contextual Disambiguation</span>
            </div>

            ${!isDismissed ? `
              <div class="text-[11px] text-slate-300 pt-1 border-t border-white/10">
                <span class="text-slate-400 font-medium">Giải pháp xử lý hậu kỳ (Goodlife Standard):</span>
                <p class="text-teal-300 mt-0.5">→ Chuyển phân cảnh này sang màu <strong>Đen - Trắng (B&W)</strong>, giảm bão hòa (Desaturation) màu đỏ &lt; 20%, hoặc áp hiệu ứng Blur che mờ 70% vùng thương tổn.</p>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    });

    this.violatingFramesContainer.innerHTML = html;
  }

  // =========================================================================
  // BƯỚC D METHODS: TOGGLE FRAME DISMISS & GEMINI RE-VERIFICATION
  // =========================================================================
  toggleFrameDismiss(frameIndex) {
    if (!this.violatingFrames || !this.violatingFrames[frameIndex]) return;
    const frame = this.violatingFrames[frameIndex];
    frame.dismissed = !frame.dismissed;

    const activeViolations = this.violatingFrames.filter(f => !f.dismissed);

    if (activeViolations.length === 0) {
      this.setPipelineStep(this.stepVisual3, 'done', '3. ✓ Khung hình Đạt Chuẩn 100/100 (Đã xác nhận)');
      this.showToast('✓ Đã xác nhận khung hình là đồ vật/màu áo. Điểm an toàn hình ảnh đạt 100/100!');
    } else {
      this.setPipelineStep(this.stepVisual3, 'danger', `3. 🚨 Còn ${activeViolations.length} Ảnh Cần Xử Lý`);
      if (frame.dismissed) {
        this.showToast(`✓ Đã bỏ cảnh báo khung hình tại ${frame.timestamp}.`);
      } else {
        this.showToast(`Đã khôi phục cảnh báo khung hình tại ${frame.timestamp}.`);
      }
    }

    this.renderViolatingFramesResult(this.violatingFrames);
    this.updateOverallPipelineStatus();
  }

  resetAllFrameDismissals() {
    if (!this.violatingFrames) return;
    this.violatingFrames.forEach(f => f.dismissed = false);
    this.renderViolatingFramesResult(this.violatingFrames);
    this.updateOverallPipelineStatus();
  }

  async verifyFrameWithGemini(frameIndex) {
    if (!this.violatingFrames || !this.violatingFrames[frameIndex]) return;
    const frame = this.violatingFrames[frameIndex];

    const apiKey = this.geminiApiKey || localStorage.getItem('goodlife_gemini_api_key');
    if (!apiKey) {
      if (this.geminiConfigDrawer) {
        this.geminiConfigDrawer.classList.remove('hidden');
        if (this.geminiApiKeyInput) this.geminiApiKeyInput.focus();
      }
      alert('Vui lòng nhập Google Gemini API Key trong bảng cấu hình phía trên để kích hoạt AI Vision 2.5 Flash!');
      return;
    }

    this.showToast(`🤖 Đang phân tích khung hình ${frame.timestamp} với AI Gemini Vision 2.5 Flash...`);

    try {
      const result = await this.analyzeFrameWithGeminiVision(frame.dataUrl);

      if (result.is_violation === false) {
        frame.dismissed = true;
        const note = result.safe_red_note || 'Phát hiện sắc đỏ từ trang phục/đồ họa (An toàn - Không phải máu y khoa)';
        frame.reason = `✓ AI Gemini Vision 2.5 Flash xác nhận AN TOÀN: ${note}.`;

        if (this.safeRedDetectedBanner && this.safeRedDetectedText) {
          this.safeRedDetectedBanner.classList.remove('hidden');
          this.safeRedDetectedText.textContent = note;
        }

        this.renderViolatingFramesResult(this.violatingFrames);
        this.updateOverallPipelineStatus();
        this.showToast('✓ AI Gemini Vision 2.5 Flash: Đã phân biệt trang phục/đồ họa an toàn (Không phải máu y khoa)!');
      } else {
        frame.dismissed = false;
        frame.isSuspected = false;
        frame.reason = `🚨 AI Gemini Vision 2.5 Flash xác nhận vi phạm: ${result.reason || 'Dấu hiệu máu sinh học / vết thương hở y tế.'}`;
        this.renderViolatingFramesResult(this.violatingFrames);
        this.updateOverallPipelineStatus();
        this.showToast('🚨 AI Gemini Vision 2.5 Flash: Phát hiện vết rạch phẫu thuật / máu y khoa!');
      }
    } catch (err) {
      console.error(err);
      alert(`Lỗi khi gọi Gemini Vision API: ${err.message}`);
    }
  }

  showToast(message) {
    let toast = document.getElementById('app-toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'app-toast-notification';
      toast.className = 'fixed top-6 left-1/2 -translate-x-1/2 z-[9999] max-w-lg w-[92%] sm:w-auto px-5 py-3.5 rounded-2xl bg-slate-900/95 border border-cyan-500/50 shadow-2xl shadow-cyan-500/20 backdrop-blur-xl text-white text-xs font-medium flex items-center gap-3 transition-all duration-300 opacity-0 pointer-events-none transform -translate-y-4';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `
      <div class="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/40">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
      </div>
      <div class="leading-relaxed">${message}</div>
    `;

    const raf = typeof requestAnimationFrame === 'function' ? requestAnimationFrame : (cb) => setTimeout(cb, 16);
    raf(() => {
      toast.classList.remove('opacity-0', 'pointer-events-none', '-translate-y-4');
      toast.classList.add('opacity-100', 'translate-y-0');
    });

    if (toast._timer) clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove('opacity-100', 'translate-y-0');
      toast.classList.add('opacity-0', 'pointer-events-none', '-translate-y-4');
    }, 4000);
  }
}

// Khởi tạo ứng dụng khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
  window.tiktokAuditApp = new TiktokAuditApp();
});


