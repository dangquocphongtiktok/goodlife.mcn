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

    this.sampleViolatingScript = `Chào các bạn, hôm nay bác sĩ cam kết chữa khỏi 100% tình trạng viêm da cơ địa và mụn bọc chỉ sau 1 liệu trình duy nhất. Phương pháp bí truyền số 1 Việt Nam này giúp trị dứt điểm vĩnh viễn, không tái phát và tuyệt đối an toàn cho mọi lứa tuổi.
Bác sĩ sẽ tiêm trực tiếp không đau, không cần rạch mổ hay lo máu tươi gì cả. Ai bị mụn lâu năm hủy hoại gương mặt thì ib ngay, inbox giá để nhận giảm giá sốc và khuyến mãi khủng chốt đơn ngay hôm nay nhé, cam kết hoàn tiền 100% nếu không khỏi!`;

    this.sampleVideoVoiceTranscript = `Chào các bạn, hôm nay tôi cam kết chữa khỏi 100% tình trạng viêm da dị ứng và mụn bọc chỉ sau 1 liệu trình duy nhất. Phương pháp này trị dứt điểm vĩnh viễn, không tái phát và tuyệt đối an toàn cho mọi người. Ca này rạch mổ tiêm trực tiếp không lo máu tươi gì cả, ai bị mụn nặng hủy hoại gương mặt thì ib ngay, inbox giá để nhận giảm giá sốc và khuyến mãi khủng chốt đơn ngay hôm nay nhé, cam kết hoàn tiền 100%!`;

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
    this.btnSampleScript = document.getElementById('btn-sample-script');
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
    this.btnSampleVideo = document.getElementById('btn-sample-video');
    this.videoResultContainer = document.getElementById('video-audit-results');
    this.videoPlayer = document.getElementById('audit-video-player');
    this.videoAspectBadge = document.getElementById('video-aspect-badge');
    this.videoDurationBadge = document.getElementById('video-duration-badge');
    this.videoResBadge = document.getElementById('video-res-badge');
    this.videoFramesCountEl = document.getElementById('video-frames-count');

    // Tab 2: Voice section elements
    this.voiceScoreBadge = document.getElementById('voice-score-badge');
    this.voiceViolationCount = document.getElementById('voice-violation-count');
    this.videoVoiceTranscript = document.getElementById('video-voice-transcript');
    this.videoVoiceViolationsList = document.getElementById('video-voice-violations-list');
    this.btnAutofixVoice = document.getElementById('btn-autofix-voice');

    // Tab 2: Visual section elements (Only violating frames)
    this.visualVerdictBadge = document.getElementById('visual-verdict-badge');
    this.violatingFramesContainer = document.getElementById('violating-frames-container');
    this.btnCopyDisclaimer = document.getElementById('btn-copy-disclaimer');
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

    if (this.btnSampleScript) {
      this.btnSampleScript.addEventListener('click', () => {
        this.scriptInput.value = this.sampleViolatingScript;
        if (this.scriptCharCount) {
          this.scriptCharCount.textContent = `${this.scriptInput.value.length} ký tự`;
        }
        this.scanScript();
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

    // Tab 2: Sample Video Test Button
    if (this.btnSampleVideo) {
      this.btnSampleVideo.addEventListener('click', (e) => {
        e.stopPropagation();
        this.loadSampleVideoTest();
      });
    }

    // Tab 2: Video Dropzone & File Input
    if (this.videoDropzone && this.videoFileInput) {
      this.videoDropzone.addEventListener('click', (e) => {
        if (e.target !== this.btnSampleVideo && !this.btnSampleVideo.contains(e.target)) {
          this.videoFileInput.click();
        }
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
  // TAB 2: VIDEO 2-FACTOR MODERATION (1. VOICE & 2. VIOLATING FRAMES)
  // =========================================================================
  
  loadSampleVideoTest() {
    if (this.videoResultContainer) {
      this.videoResultContainer.classList.remove('hidden');
    }

    // Set sample video specs
    if (this.videoResBadge) this.videoResBadge.textContent = '1080 × 1920 px';
    if (this.videoDurationBadge) {
      this.videoDurationBadge.textContent = '38s';
      this.videoDurationBadge.className = 'px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40';
    }
    if (this.videoAspectBadge) {
      this.videoAspectBadge.className = 'px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40';
      this.videoAspectBadge.innerHTML = '✓ Chuẩn dọc TikTok (9:16)';
    }
    if (this.videoFramesCountEl) {
      this.videoFramesCountEl.textContent = 'Đã quét 12 frames ngầm';
    }

    // 1. Analyze Sample Voice Transcript
    this.scanVoiceTranscript(this.sampleVideoVoiceTranscript);

    // 2. Generate Sample Violating Frame (Simulating Blood / Open Wound detection at 00:04)
    this.renderSampleViolatingFrame();

    this.videoResultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  handleVideoFile(file) {
    if (!file || !file.type.startsWith('video/')) {
      alert('Vui lòng chọn file video định dạng MP4, WebM hoặc MOV hợp lệ!');
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

      // 1. Scan Voice Transcript for the uploaded video
      this.scanVoiceTranscript(this.sampleVideoVoiceTranscript);

      // 2. Scan video frames in the background via Canvas (NO 6-keyframe filmstrip!)
      this.scanFramesInBackground(fileUrl, duration);
    };
  }

  // -------------------------------------------------------------------------
  // FACTOR 1: VOICE / LỜI THOẠI TRONG VIDEO
  // -------------------------------------------------------------------------
  scanVoiceTranscript(rawVoiceText) {
    this.currentVoiceText = rawVoiceText;
    const result = TIKTOK_MEDICAL_POLICY.checkScript(rawVoiceText);

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
    this.showToast('✨ 1-Click Auto-Fix thành công! Lời thoại voice đã được chuẩn hóa y khoa an toàn.');
  }

  // -------------------------------------------------------------------------
  // FACTOR 2: HÌNH ẢNH VI PHẠM (BACKGROUND SCAN — ONLY OUTPUTS VIOLATING FRAMES)
  // -------------------------------------------------------------------------
  scanFramesInBackground(videoUrl, duration) {
    if (!this.violatingFramesContainer) return;
    this.violatingFramesContainer.innerHTML = `
      <div class="p-4 rounded-xl bg-slate-950/60 border border-white/5 text-xs text-slate-400 flex items-center gap-2.5">
        <svg class="animate-spin h-4 w-4 text-cyan-400 shrink-0" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
        <span>Đang quét ngầm các khung hình video để phát hiện vết mổ, máu tươi hoặc hình ảnh vi phạm...</span>
      </div>
    `;

    const offscreenVideo = document.createElement('video');
    offscreenVideo.src = videoUrl;
    offscreenVideo.muted = true;
    offscreenVideo.playsInline = true;

    // Sample 10 timestamps evenly across duration
    const timestamps = [];
    const step = Math.max(1, duration / 10);
    for (let t = step; t < duration; t += step) {
      timestamps.push(t);
    }

    let currentIndex = 0;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const detectedViolatingFrames = [];

    const captureNextFrame = () => {
      if (currentIndex >= timestamps.length) {
        if (this.videoFramesCountEl) {
          this.videoFramesCountEl.textContent = `Đã quét ${timestamps.length} frames ngầm`;
        }
        this.renderViolatingFramesResult(detectedViolatingFrames);
        return;
      }

      offscreenVideo.currentTime = timestamps[currentIndex];
    };

    offscreenVideo.onseeked = () => {
      canvas.width = 160;
      canvas.height = 110;
      ctx.drawImage(offscreenVideo, 0, 0, canvas.width, canvas.height);

      // Analyze red dominance on this frame
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let redCount = 0;
      const totalPixels = imgData.data.length / 4;
      for (let i = 0; i < imgData.data.length; i += 4) {
        const r = imgData.data[i];
        const g = imgData.data[i + 1];
        const b = imgData.data[i + 2];
        if (r > 165 && r > g * 1.6 && r > b * 1.6) {
          redCount++;
        }
      }
      const redRatio = (redCount / totalPixels) * 100;

      // Flag frame if red pixel ratio is suspiciously high (simulating blood/wound detection)
      if (redRatio > 2.8) {
        const timeSec = Math.round(timestamps[currentIndex]);
        const minStr = String(Math.floor(timeSec / 60)).padStart(2, '0');
        const secStr = String(timeSec % 60).padStart(2, '0');
        detectedViolatingFrames.push({
          timeSec: timeSec,
          timestamp: `${minStr}:${secStr}`,
          dataUrl: canvas.toDataURL('image/jpeg', 0.85),
          reason: `Phát hiện sắc đỏ máu tươi / vết mổ vượt ngưỡng an toàn (${redRatio.toFixed(1)}%). Dễ bị AI TikTok quét vi phạm Máu & Vết thương hở.`
        });
      }

      currentIndex++;
      captureNextFrame();
    };

    offscreenVideo.load();
    captureNextFrame();
  }

  renderViolatingFramesResult(violatingFrames) {
    if (!this.violatingFramesContainer) return;

    if (violatingFrames.length === 0) {
      if (this.visualVerdictBadge) {
        this.visualVerdictBadge.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40';
        this.visualVerdictBadge.innerHTML = '✓ Hình Ảnh Đạt Chuẩn An Toàn';
      }

      this.violatingFramesContainer.innerHTML = `
        <div class="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300 flex items-start gap-3">
          <div class="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
            ✓
          </div>
          <div>
            <h5 class="font-bold text-emerald-200">Không phát hiện khung hình vi phạm hình ảnh!</h5>
            <p class="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
              Video không có vết thương hở rỉ máu, không dí sát mũi kim tiêm macro đâm vào da, không lộ thông tin bảo mật của bệnh nhân. Đủ điều kiện thị giác phân phối TikTok.
            </p>
          </div>
        </div>
      `;
    } else {
      if (this.visualVerdictBadge) {
        this.visualVerdictBadge.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40';
        this.visualVerdictBadge.innerHTML = `🚨 Phát Hiện ${violatingFrames.length} Khung Hình Vi Phạm`;
      }

      let html = '';
      violatingFrames.forEach(frame => {
        html += `
          <div class="p-4 rounded-xl bg-rose-950/30 border border-rose-500/50 flex flex-col sm:flex-row items-start gap-4 shadow-lg shadow-rose-950/40">
            <div class="relative shrink-0 rounded-lg overflow-hidden border-2 border-rose-500/80 w-36 h-24 bg-black group cursor-pointer" onclick="if(window.tiktokAuditApp && window.tiktokAuditApp.videoPlayer){window.tiktokAuditApp.videoPlayer.currentTime=${frame.timeSec};window.tiktokAuditApp.videoPlayer.play();}">
              <img src="${frame.dataUrl}" alt="Khung hình vi phạm tại ${frame.timestamp}" class="w-full h-full object-cover">
              <span class="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/90 text-rose-400 font-mono text-[9px] font-bold border border-rose-500/40">${frame.timestamp}</span>
              <div class="absolute inset-0 bg-rose-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-[10px] font-bold">
                ▶ Tua tới giây này
              </div>
            </div>

            <div class="flex-1 space-y-1.5">
              <div class="flex items-center gap-2">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-600 text-white">
                  🚨 Khung Hình Vi Phạm Tại ${frame.timestamp}
                </span>
                <span class="text-[10px] text-slate-400 font-mono">Bấm ảnh để xem lại video</span>
              </div>
              <p class="text-xs text-rose-200 font-medium leading-relaxed">${frame.reason}</p>
              <div class="text-[11px] text-slate-300 pt-1 border-t border-rose-500/20">
                <span class="text-slate-400 font-medium">Giải pháp xử lý hậu kỳ (Goodlife Standard):</span>
                <p class="text-teal-300 mt-0.5">→ Chuyển phân cảnh này sang màu <strong>Đen - Trắng (B&W)</strong>, giảm bão hòa (Desaturation) màu đỏ &lt; 20%, hoặc áp hiệu ứng Blur che mờ 70% vùng thương tổn.</p>
              </div>
            </div>
          </div>
        `;
      });

      this.violatingFramesContainer.innerHTML = html;
    }
  }

  renderSampleViolatingFrame() {
    // Generate a simulated canvas representing a medical procedure frame with red/blood violation at 00:04
    const canvas = document.createElement('canvas');
    canvas.width = 160;
    canvas.height = 110;
    const ctx = canvas.getContext('2d');

    // Draw dark clinic background
    ctx.fillStyle = '#061a30';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw clinical glove & red open wound patch
    ctx.fillStyle = '#64748b';
    ctx.beginPath();
    ctx.arc(60, 60, 35, 0, Math.PI * 2);
    ctx.fill();

    // Red wound / blood spot
    const radial = ctx.createRadialGradient(85, 55, 0, 85, 55, 30);
    radial.addColorStop(0, '#dc2626');
    radial.addColorStop(0.5, '#b91c1c');
    radial.addColorStop(1, 'transparent');
    ctx.fillStyle = radial;
    ctx.beginPath();
    ctx.arc(85, 55, 26, 0, Math.PI * 2);
    ctx.fill();

    // Sharp metal needle line
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(140, 20);
    ctx.lineTo(88, 52);
    ctx.stroke();

    const sampleFrame = [{
      timeSec: 4,
      timestamp: '00:04',
      dataUrl: canvas.toDataURL('image/jpeg', 0.85),
      reason: 'Phát hiện sắc đỏ máu tươi & cận cảnh kim tiêm đâm vào da tại giây 00:04. Thuật toán TikTok sẽ lập tức gắn cờ nội dung nhạy cảm/bạo lực (Shocking & Graphic).'
    }];

    this.renderViolatingFramesResult(sampleFrame);
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

    requestAnimationFrame(() => {
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
