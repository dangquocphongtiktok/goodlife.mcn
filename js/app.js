/**
 * Goodlife Media - Main Orchestrator (Menu Sync, Floating Labels, Side Drawer & Modals)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const labelsContainer = document.getElementById('labels-container');
  const svgConnectors = document.getElementById('svg-connectors');
  const sidePanel = document.getElementById('side-panel');
  const panelTitle = document.getElementById('panel-title');
  const panelTag = document.getElementById('panel-tag');
  const panelSubtitle = document.getElementById('panel-subtitle');
  const panelBody = document.getElementById('panel-body');
  const btnClosePanel = document.getElementById('btn-close-panel');
  const menuItems = document.querySelectorAll('.menu-item');
  const preloader = document.getElementById('preloader');
  const modalConsultation = document.getElementById('modal-consultation');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const consultationForm = document.getElementById('consultation-form');

  // Email Configuration & Dispatcher
  const TARGET_EMAIL = 'goodlife.mcn@gmail.com';
  const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${TARGET_EMAIL}`;

  function showToastNotification(message, duration = 4500) {
    let toast = document.getElementById('app-toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'app-toast-notification';
      toast.className = 'fixed top-6 left-1/2 -translate-x-1/2 z-[9999] max-w-lg w-[92%] sm:w-auto px-5 py-3.5 rounded-2xl bg-slate-900/95 border border-teal-500/50 shadow-2xl shadow-teal-500/20 backdrop-blur-xl text-white text-xs font-medium flex items-center gap-3 transition-all duration-300 opacity-0 pointer-events-none transform -translate-y-4';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `
      <div class="w-7 h-7 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 border border-teal-500/40">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
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
    }, duration);
  }

  async function sendConsultationToEmail(formEl, submitBtn, originalHtml, onComplete) {
    const fullnameInput = formEl.querySelector('input[name="fullname"]') || formEl.querySelector('#modal-fullname') || formEl.querySelector('#inline-fullname') || formEl.querySelector('input[type="text"]');
    const phoneInput = formEl.querySelector('input[name="phone"]') || formEl.querySelector('#modal-phone') || formEl.querySelector('#inline-phone') || formEl.querySelector('input[type="tel"]');
    const facilityInput = formEl.querySelector('input[name="facility"]') || formEl.querySelector('#modal-facility') || formEl.querySelector('#inline-facility') || formEl.querySelectorAll('input[type="text"]')[1];
    const serviceSelect = formEl.querySelector('select[name="service"]') || formEl.querySelector('select');

    const fullname = fullnameInput && fullnameInput.value.trim() ? fullnameInput.value.trim() : 'Chưa cung cấp';
    const phone = phoneInput && phoneInput.value.trim() ? phoneInput.value.trim() : 'Chưa cung cấp';
    const facility = facilityInput && facilityInput.value.trim() ? facilityInput.value.trim() : 'Phòng khám / Cơ sở y tế';
    const service = serviceSelect ? serviceSelect.value : 'Tư vấn chiến lược truyền thông y khoa';

    const timeStr = new Date().toLocaleString('vi-VN', {
      hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric'
    });

    let customDetailsText = '';
    if (window.__customQuoteDetails && service.includes('Riêng Lẻ')) {
      customDetailsText = window.__customQuoteDetails.items.join(', ') + ` (Tổng dự toán: ${window.__customQuoteDetails.total})`;
    }

    const payload = {
      "Họ tên Bác sĩ / Quản lý": fullname,
      "Số điện thoại / Zalo": phone,
      "Cơ sở y tế / Chuyên khoa": facility,
      "Nhu cầu tư vấn trọng tâm": service,
      "Dịch vụ tùy chọn": customDetailsText || 'Gói mặc định',
      "Thời gian đăng ký": timeStr,
      "_subject": `[Goodlife Media 3D] Đăng Ký Tư Vấn Mới: ${fullname} - ${phone}`,
      "_template": "table",
      "_captcha": "false"
    };

    // Prepare mailto fallback URL
    const emailSubject = encodeURIComponent(`[Goodlife Media 3D] Đăng Ký Tư Vấn: ${fullname} (${phone})`);
    const emailBody = encodeURIComponent(
      `Chào Goodlife Media,\n\n` +
      `Tôi muốn gửi yêu cầu tư vấn chiến lược truyền thông y khoa:\n` +
      `• Họ tên Bác sĩ / Quản lý: ${fullname}\n` +
      `• SĐT / Zalo: ${phone}\n` +
      `• Cơ sở y tế / Chuyên khoa: ${facility}\n` +
      `• Nhu cầu trọng tâm: ${service}\n` +
      (customDetailsText ? `• Gói dịch vụ tùy chọn: ${customDetailsText}\n` : '') +
      `• Thời gian đăng ký: ${timeStr}\n\n` +
      `Xin cảm ơn!`
    );
    const mailtoUrl = `mailto:${TARGET_EMAIL}?subject=${emailSubject}&body=${emailBody}`;

    // UI Loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Đang gửi tới ${TARGET_EMAIL}...
    `;

    try {
      const response = await fetch(FORMSUBMIT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        submitBtn.innerHTML = `
          <svg class="w-4 h-4 text-white inline mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
          ✓ Đã Gửi Thành Công Tới Email!
        `;
        submitBtn.classList.add('bg-emerald-600');
        showToastNotification(`✓ Yêu cầu tư vấn đã được gửi thẳng vào email <strong>${TARGET_EMAIL}</strong>! Ekip Goodlife Media sẽ phản hồi sớm nhất.`);
      } else {
        throw new Error('FormSubmit non-ok response');
      }
    } catch (err) {
      console.warn('Direct fetch failed, using mailto fallback:', err);
      window.location.href = mailtoUrl;

      submitBtn.innerHTML = `
        <svg class="w-4 h-4 text-white inline mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
        ✓ Đang Mở Email (${TARGET_EMAIL})...
      `;
      submitBtn.classList.add('bg-emerald-600');
      showToastNotification(`Đang mở ứng dụng Email gửi tới <strong>${TARGET_EMAIL}</strong>. Bạn chỉ cần nhấn Gửi (Send).`);
    }

    setTimeout(() => {
      formEl.reset();
      window.__customQuoteDetails = null;
      submitBtn.innerHTML = originalHtml;
      submitBtn.disabled = false;
      submitBtn.classList.remove('bg-emerald-600');
      if (onComplete) onComplete();
    }, 2800);
  }
  const labelElements = [];
  const lineElements = [];
  let activeNodeIdx = null;

  // 1. Initialize Master 3D Scene
  const buildingScene = new BuildingScene('webgl-container');

  // 2. Initialize Camera Controller with callbacks
  const cameraController = new CameraController(
    buildingScene,
    // onSelect callback
    (nodeIdx) => {
      selectNode(nodeIdx);
    },
    // onHover callback
    (nodeIdx) => {
      handleNodeHover(nodeIdx);
    }
  );

  // 3. Create Floating 3D HTML Labels & SVG Connectors
  function createFloatingLabels() {
    labelsContainer.innerHTML = '';
    svgConnectors.innerHTML = '';
    labelElements.length = 0;
    lineElements.length = 0;

    NODES_DATA.forEach((data, idx) => {
      // HTML Label Card
      const labelDiv = document.createElement('div');
      labelDiv.className = 'building-label';
      labelDiv.setAttribute('data-node', idx);
      labelDiv.innerHTML = `
        <div class="label-card" style="--node-accent: ${data.accentColor};">
          <div class="label-indicator" style="background-color: ${data.accentColor}; box-shadow: 0 0 12px 2px ${data.accentColor};"></div>
          <span class="font-mono font-black text-sm md:text-base mr-1 tracking-tight" style="color: ${data.accentColor}; text-shadow: 0 0 12px ${data.accentColor}90;">${data.prefixNum}</span>
          <span class="text-xs md:text-sm font-extrabold tracking-wide" style="color: ${data.accentColor}; text-shadow: 0 0 12px ${data.accentColor}60, 0 1px 3px rgba(0,0,0,0.9);">${data.labelTitle}</span>
        </div>
      `;

      labelDiv.addEventListener('mouseenter', () => handleNodeHover(idx));
      labelDiv.addEventListener('mouseleave', () => handleNodeHover(null));
      labelDiv.addEventListener('click', (e) => {
        e.stopPropagation();
        selectNode(idx);
      });

      labelsContainer.appendChild(labelDiv);
      labelElements.push(labelDiv);

      // SVG Connector Line
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('class', 'connector-line');
      line.style.stroke = data.accentColor;
      svgConnectors.appendChild(line);
      lineElements.push(line);
    });
  }

  createFloatingLabels();

  // 4. Update 3D Floating Labels and SVG Connectors Screen Positions
  const tempVec = new THREE.Vector3();
  function updateFloatingLabels() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isSidePanelOpen = sidePanel.classList.contains('open');
    const anchors = buildingScene.labelAnchors;

    if (!anchors || anchors.length === 0) return;

    NODES_DATA.forEach((data, idx) => {
      const anchor = anchors[idx];
      const labelEl = labelElements[idx];
      const lineEl = lineElements[idx];

      if (!anchor || !labelEl || !lineEl) return;

      anchor.getWorldPosition(tempVec);
      tempVec.project(buildingScene.camera);

      // Check if behind camera or invalid projection coordinates
      if (tempVec.z > 1 || isNaN(tempVec.x) || isNaN(tempVec.y)) {
        labelEl.style.opacity = '0';
        lineEl.style.opacity = '0';
        return;
      }

      // Convert normalized device coords [-1, 1] to screen pixels
      const screenX = (tempVec.x * 0.5 + 0.5) * width;
      const screenY = (-(tempVec.y * 0.5) + 0.5) * height;

      // Label card placement offset: to the right of the node anchor
      const labelOffsetX = isSidePanelOpen ? 85 : 135;
      const targetLabelX = screenX + labelOffsetX;
      const targetLabelY = screenY;

      // Visibility adjustments when drawer is open
      if (isSidePanelOpen && width < 1200) {
        labelEl.style.opacity = '0.15';
        lineEl.style.opacity = '0.15';
      } else {
        labelEl.style.opacity = (activeNodeIdx !== null && activeNodeIdx !== idx) ? '0.35' : '1';
        lineEl.style.opacity = (activeNodeIdx !== null && activeNodeIdx !== idx) ? '0.2' : '0.85';
      }

      labelEl.style.transform = `translate(${targetLabelX}px, ${targetLabelY}px) translate(-50%, -50%)`;

      // Update SVG line from 3D anchor to label edge
      const cardHalfWidth = (labelEl.offsetWidth ? (labelEl.offsetWidth / 2) : 60);
      lineEl.setAttribute('x1', screenX);
      lineEl.setAttribute('y1', screenY);
      lineEl.setAttribute('x2', targetLabelX - cardHalfWidth);
      lineEl.setAttribute('y2', targetLabelY);
    });
  }

  // 5. Node Selection & Side Drawer Logic
  function selectNode(nodeIdx) {
    activeNodeIdx = nodeIdx;
    const data = NODES_DATA[nodeIdx];
    if (!data) return;

    // Camera dolly zoom and DNA rotation
    cameraController.focusFloor(nodeIdx);

    // Highlight node
    buildingScene.setHoverFloor(nodeIdx);

    // Populate Side Drawer Content
    panelTag.textContent = data.tagline;
    panelTag.style.color = data.accentColor;
    panelTitle.textContent = data.title;
    panelSubtitle.textContent = data.subtitle;
    panelBody.innerHTML = data.content;

    // Initialize interactive components inside panel
    initPanelInteractions(nodeIdx);

    // Open Side Drawer
    sidePanel.classList.add('open');

    // Sync Menu active state
    updateMenuActiveState(data.menuIndex);

    // Sync Label active styling
    labelElements.forEach((el, i) => {
      if (i === nodeIdx) {
        el.classList.add('active');
        lineElements[i].classList.add('active');
      } else {
        el.classList.remove('active');
        lineElements[i].classList.remove('active');
      }
    });
  }

  // Hook up interactive behaviors inside the panels
  function initPanelInteractions(nodeIdx) {
    // 1. Panel 02: Dịch Vụ & Báo Giá (nodeIdx === 2)
    if (nodeIdx === 2) {
      const tabBtns = panelBody.querySelectorAll('.pricing-tab-btn');
      const tabPanes = panelBody.querySelectorAll('.pricing-tab-pane');

      tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const targetTabId = btn.getAttribute('data-tab');
          tabBtns.forEach(b => {
            b.classList.remove('active');
            b.classList.add('text-slate-400');
            b.classList.remove('text-teal-300', 'bg-teal-500/20', 'border-teal-500/40');
          });
          btn.classList.add('active');
          btn.classList.remove('text-slate-400');
          btn.classList.add('text-teal-300', 'bg-teal-500/20', 'border-teal-500/40');

          tabPanes.forEach(pane => {
            if (pane.id === targetTabId) {
              pane.classList.remove('hidden');
            } else {
              pane.classList.add('hidden');
            }
          });
        });
      });

      // Price Calculator Checkboxes
      const checkboxes = panelBody.querySelectorAll('.service-checkbox');
      const totalPriceEl = panelBody.querySelector('#custom-total-price');
      const countBadgeEl = panelBody.querySelector('#selected-count-badge');

      function recalculatePrice() {
        let total = 0;
        let count = 0;
        checkboxes.forEach(cb => {
          if (cb.checked) {
            total += parseInt(cb.getAttribute('data-price') || '0', 10);
            count++;
          }
        });

        if (totalPriceEl) {
          totalPriceEl.textContent = total.toLocaleString('vi-VN') + ' VNĐ';
        }
        if (countBadgeEl) {
          countBadgeEl.textContent = `${count} gói đã chọn`;
        }
      }

      checkboxes.forEach(cb => {
        cb.addEventListener('change', recalculatePrice);
      });

      // ================= Quản lý số buổi quay hình (Shooting Sessions Stepper) =================
      let quaySessions = 1;
      const baseShootingPrice = 2500000;
      const cbQuayHinh = panelBody.querySelector('#cb-quay-hinh');
      const btnDecQuay = panelBody.querySelector('#btn-dec-quay');
      const btnIncQuay = panelBody.querySelector('#btn-inc-quay');
      const quayCountEl = panelBody.querySelector('#quay-sessions-count');
      const quaySubtotalEl = panelBody.querySelector('#quay-hinh-subtotal');
      const presetBtns = panelBody.querySelectorAll('.btn-preset-quay');

      function updateQuaySessions(count, autoCheck = true) {
        quaySessions = Math.max(1, Math.min(20, count));
        if (quayCountEl) quayCountEl.textContent = quaySessions;

        const subtotal = quaySessions * baseShootingPrice;
        if (quaySubtotalEl) {
          quaySubtotalEl.textContent = (quaySessions > 1 ? `${subtotal.toLocaleString('vi-VN')} đ (${quaySessions} buổi)` : '2.500.000 đ/buổi');
        }

        if (cbQuayHinh) {
          cbQuayHinh.setAttribute('data-price', subtotal);
          cbQuayHinh.setAttribute('data-name', `Quay hình & Di chuyển (${quaySessions} buổi)`);
          if (autoCheck && !cbQuayHinh.checked) {
            cbQuayHinh.checked = true;
          }
        }

        // Highlight active preset
        presetBtns.forEach(p => {
          const s = parseInt(p.getAttribute('data-sessions') || '1', 10);
          if (s === quaySessions) {
            p.classList.add('bg-teal-500/25', 'text-teal-300', 'border-teal-500/50');
            p.classList.remove('bg-slate-800', 'text-slate-300');
          } else {
            p.classList.remove('bg-teal-500/25', 'text-teal-300', 'border-teal-500/50');
            p.classList.add('bg-slate-800', 'text-slate-300');
          }
        });

        recalculatePrice();
      }

      if (btnDecQuay) {
        btnDecQuay.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          updateQuaySessions(quaySessions - 1);
        });
      }

      if (btnIncQuay) {
        btnIncQuay.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          updateQuaySessions(quaySessions + 1);
        });
      }

      presetBtns.forEach(p => {
        p.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const s = parseInt(p.getAttribute('data-sessions') || '1', 10);
          updateQuaySessions(s);
        });
      });

      window.requestCustomSelection = function() {
        const selected = [];
        let total = 0;
        checkboxes.forEach(cb => {
          if (cb.checked) {
            selected.push(cb.getAttribute('data-name'));
            total += parseInt(cb.getAttribute('data-price') || '0', 10);
          }
        });

        if (selected.length === 0) {
          alert('Vui lòng tích chọn ít nhất 1 gói dịch vụ để nhận báo giá chi tiết!');
          return;
        }

        window.__customQuoteDetails = {
          items: selected,
          total: total.toLocaleString('vi-VN') + ' VNĐ'
        };

        window.openConsultationModal();
        const selectDropdown = document.querySelector('#modal-consultation select');
        if (selectDropdown) {
          selectDropdown.value = 'Gói Dịch Vụ Riêng Lẻ (Kịch bản, Quay, Dựng, SEO)';
        }
      };

      window.openConsultationModalWithService = function(serviceName) {
        window.openConsultationModal();
        const selectDropdown = document.querySelector('#modal-consultation select');
        if (selectDropdown) {
          if (serviceName.includes('25')) {
            selectDropdown.value = 'Gói Truyền Thông Trọn Gói 25 triệu/tháng (30 video + MCN + Ads)';
          } else if (serviceName.includes('15')) {
            selectDropdown.value = 'Gói Truyền Thông Tiêu Chuẩn 15 triệu/tháng (30 video + MCN)';
          }
        }
      };
    }

    // 2. Panel 03: Sensory Design (nodeIdx === 1)
    if (nodeIdx === 1) {
      const rangeSlider = panelBody.querySelector('#sensory-range-slider');
      const layerBefore = panelBody.querySelector('#sensory-layer-before');
      const sliderHandle = panelBody.querySelector('#sensory-slider-handle');
      const dividerLine = panelBody.querySelector('#sensory-divider-line');
      const visualizer = panelBody.querySelector('#sensory-visualizer');

      function updateSensorySlider(val) {
        const pct = Math.max(0, Math.min(100, parseFloat(val)));
        if (layerBefore) {
          layerBefore.style.clipPath = `polygon(0 0, ${pct}% 0, ${pct}% 100%, 0 100%)`;
          layerBefore.style.webkitClipPath = `polygon(0 0, ${pct}% 0, ${pct}% 100%, 0 100%)`;
        }
        if (sliderHandle) {
          sliderHandle.style.left = `${pct}%`;
        }
        if (dividerLine) {
          dividerLine.style.left = `${pct}%`;
        }
      }

      if (rangeSlider) {
        rangeSlider.addEventListener('input', (e) => {
          updateSensorySlider(e.target.value);
        });
        rangeSlider.addEventListener('change', (e) => {
          updateSensorySlider(e.target.value);
        });
      }

      // Smooth pointer drag directly on the visualizer frame
      if (visualizer && rangeSlider) {
        let isDragging = false;
        const setPosFromPointer = (clientX) => {
          const rect = visualizer.getBoundingClientRect();
          const x = clientX - rect.left;
          const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
          rangeSlider.value = pct;
          updateSensorySlider(pct);
        };

        visualizer.addEventListener('pointerdown', (e) => {
          isDragging = true;
          setPosFromPointer(e.clientX);
        });

        window.addEventListener('pointermove', (e) => {
          if (isDragging) {
            setPosFromPointer(e.clientX);
          }
        });

        window.addEventListener('pointerup', () => {
          isDragging = false;
        });
      }

      // Sensory 4 Mode Data
      const SENSORY_MODES = {
        light: {
          label: "Trục Ánh Sáng: Phòng Chờ Trước vs Sau Thiết Kế",
          before: {
            title: "Ánh Sáng Trắng Gay Gắt",
            desc: "Đèn tuýp huỳnh quang 6500K chiếu thẳng trần thả, gây lóa mắt và căng thẳng cho bệnh nhân ngồi chờ thăm khám.",
            spec: "Huỳnh quang 6500K"
          },
          after: {
            title: "Ánh Sáng Sinh Học Tự Nhiên",
            desc: "Tái tạo chu kỳ bình minh – hoàng hôn (2700K - 4000K) hắt trần gián tiếp, làm dịu võng mạc và giảm 38% hormone căng thẳng cortisol.",
            spec: "Circadian 2700K - 4000K"
          }
        },
        scent: {
          label: "Trục Mùi Hương: Phòng Chờ Trước vs Sau Thiết Kế",
          before: {
            title: "Mùi Cồn & Thuốc Sát Trùng Nồng Nặc",
            desc: "Mùi hóa chất y tế xộc vào ngay tại sảnh phòng chờ tạo cảm giác ớn lạnh, sợ đau đớn và căng thẳng tâm lý.",
            spec: "Mùi cồn & hóa chất"
          },
          after: {
            title: "Hương Thảo Mộc Y Học Thư Giãn",
            desc: "Khuếch tán vi hạt tinh dầu tràm trà & oải hương chuẩn dược điển tại sảnh chờ, vừa khử khuẩn không khí 99% vừa tạo cảm giác thư thái như Spa 5 sao.",
            spec: "Dược liệu tự nhiên"
          }
        },
        sound: {
          label: "Trục Âm Thanh: Phòng Chờ Trước vs Sau Thiết Kế",
          before: {
            title: "Tiếng Ồn Dội Sàn & Căng Thẳng",
            desc: "Tiếng bước chân dội sàn gạch men, tiếng gọi loa ồn ã và tạp âm vọng từ phòng thủ thuật gây bồn chồn cho người ngồi đợi.",
            spec: "Tiếng ồn 70 - 80 dBA"
          },
          after: {
            title: "Tần Số Âm Học Thư Thái 432Hz",
            desc: "Vách gỗ uốn lượn tiêu âm cao cấp kết hợp nhạc y học không lời tần số 432Hz/528Hz giúp nhịp tim ổn định và xoa dịu sóng não lo âu.",
            spec: "Âm học 432Hz < 40 dBA"
          }
        },
        visual: {
          label: "Trục Phần Nhìn: Phòng Chờ Trước vs Sau Thiết Kế",
          before: {
            title: "Ghế Chờ Kim Loại & Vách Kính Cách Biệt",
            desc: "Hàng ghế chờ kim loại lạnh lẽo, quầy tiếp đón vách kính ngăn cách tạo cảm giác xa cách, nặng nề không khí bệnh viện.",
            spec: "Ghế kim loại & vách kính"
          },
          after: {
            title: "Kiến Trúc Sinh Học (Biophilic)",
            desc: "Sofa nỉ boucle hữu cơ bo tròn mềm mại, quầy lễ tân mở thân thiện, vách gỗ ấm và mảng xanh thiên nhiên giúp bệnh nhân an lòng.",
            spec: "Sofa hữu cơ & Cây xanh"
          }
        }
      };

      const sensoryBtns = panelBody.querySelectorAll('.sensory-btn');
      const currentLabelEl = panelBody.querySelector('#sensory-current-label');
      const titleBefore = panelBody.querySelector('#sensory-title-before');
      const descBefore = panelBody.querySelector('#sensory-desc-before');
      const specBefore = panelBody.querySelector('#sensory-spec-before');
      const titleAfter = panelBody.querySelector('#sensory-title-after');
      const descAfter = panelBody.querySelector('#sensory-desc-after');
      const specAfter = panelBody.querySelector('#sensory-spec-after');

      sensoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const modeKey = btn.getAttribute('data-mode');
          const data = SENSORY_MODES[modeKey];
          if (!data) return;

          sensoryBtns.forEach(b => {
            b.classList.remove('active');
            b.classList.remove('bg-amber-500/20', 'border-amber-500/60', 'text-amber-300');
            b.classList.add('bg-slate-900/60', 'border-slate-700/60', 'text-slate-300');
          });

          btn.classList.add('active');
          btn.classList.remove('bg-slate-900/60', 'border-slate-700/60', 'text-slate-300');
          btn.classList.add('bg-amber-500/20', 'border-amber-500/60', 'text-amber-300');

          if (currentLabelEl) currentLabelEl.textContent = data.label;
          if (titleBefore) titleBefore.textContent = data.before.title;
          if (descBefore) descBefore.textContent = data.before.desc;
          if (specBefore) specBefore.textContent = data.before.spec;
          if (titleAfter) titleAfter.textContent = data.after.title;
          if (descAfter) descAfter.textContent = data.after.desc;
          if (specAfter) specAfter.textContent = data.after.spec;
        });
      });
    }

    // 3. Panel 04: FAQ & Đặt Lịch (nodeIdx === 0)
    if (nodeIdx === 0) {
      const faqItems = panelBody.querySelectorAll('.faq-item');
      faqItems.forEach(item => {
        const toggleBtn = item.querySelector('.faq-toggle');
        const contentEl = item.querySelector('.faq-content');

        toggleBtn.addEventListener('click', () => {
          const isOpen = item.classList.contains('open');
          // Close all others
          faqItems.forEach(i => {
            i.classList.remove('open');
            i.querySelector('.faq-content').classList.add('hidden');
          });

          if (!isOpen) {
            item.classList.add('open');
            contentEl.classList.remove('hidden');
          }
        });
      });

      // Inline form submit to Email goodlife.mcn@gmail.com
      const inlineForm = panelBody.querySelector('#inline-consult-form');
      if (inlineForm) {
        inlineForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const submitBtn = inlineForm.querySelector('button[type="submit"]');
          const originalText = submitBtn.innerHTML;
          sendConsultationToEmail(inlineForm, submitBtn, originalText);
        });
      }
    }
  }

  function closeOverview() {
    activeNodeIdx = null;
    cameraController.resetToOverview();
    sidePanel.classList.remove('open');
    updateMenuActiveState(null);

    labelElements.forEach((el, i) => {
      el.classList.remove('active');
      lineElements[i].classList.remove('active');
    });
  }

  btnClosePanel.addEventListener('click', closeOverview);

  // 6. Hover synchronization between Menu, 3D Model & Labels
  function handleNodeHover(nodeIdx) {
    if (activeNodeIdx !== null) return; // Don't trigger hover exploded view while in focused mode

    buildingScene.setHoverFloor(nodeIdx);

    // Highlight corresponding label
    labelElements.forEach((el, i) => {
      if (nodeIdx !== null && i === nodeIdx) {
        el.classList.add('active');
        lineElements[i].classList.add('active');
      } else {
        el.classList.remove('active');
        lineElements[i].classList.remove('active');
      }
    });

    // Highlight corresponding menu item
    if (nodeIdx !== null) {
      const menuIdx = NODES_DATA[nodeIdx].menuIndex;
      menuItems.forEach((item, mi) => {
        if (mi === menuIdx) item.classList.add('hover-sync');
        else item.classList.remove('hover-sync');
      });
    } else {
      menuItems.forEach(item => item.classList.remove('hover-sync'));
    }
  }

  // 7. Top Pill Menu Click & Hover handlers
  menuItems.forEach((btn) => {
    const menuIdx = parseInt(btn.getAttribute('data-index'), 10);
    const nodeIdx = MENU_TO_NODE_INDEX[menuIdx];

    btn.addEventListener('mouseenter', () => {
      handleNodeHover(nodeIdx);
    });

    btn.addEventListener('mouseleave', () => {
      handleNodeHover(null);
    });

    btn.addEventListener('click', () => {
      selectNode(nodeIdx);
    });
  });

  function updateMenuActiveState(activeMenuIdx) {
    menuItems.forEach((item, idx) => {
      if (idx === activeMenuIdx) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }



  // 9. Consultation Modal Triggers
  window.openConsultationModal = function() {
    modalConsultation.classList.add('open');
  };

  window.closeConsultationModal = function() {
    modalConsultation.classList.remove('open');
  };

  document.querySelectorAll('.btn-open-consultation').forEach(btn => {
    btn.addEventListener('click', window.openConsultationModal);
  });

  btnCloseModal.addEventListener('click', window.closeConsultationModal);

  modalConsultation.addEventListener('click', (e) => {
    if (e.target === modalConsultation) {
      window.closeConsultationModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeConsultationModal();
      if (window.tiktokAuditApp) {
        window.tiktokAuditApp.close();
      }
      if (activeNodeIdx !== null) {
        closeOverview();
      }
    }
  });

  if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = consultationForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      sendConsultationToEmail(consultationForm, submitBtn, originalText, () => {
        window.closeConsultationModal();
      });
    });
  }

  // 10. Remove Preloader
  setTimeout(() => {
    preloader.classList.add('fade-out');
    setTimeout(() => {
      preloader.remove();
    }, 700);
  }, 800);

  // 11. Main RAF Animation Loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();
    const delta = clock.getDelta();

    try {
      // 1. Update 3D Scene transformations
      buildingScene.update(elapsedTime, delta);

      // 2. Update Camera controller orbit & parallax
      cameraController.update();

      // 3. WebGL Render first (computes all world matrices & camera projections)
      buildingScene.render();

      // 4. Update Projected 3D Labels & Connectors with fresh matrix coordinates
      updateFloatingLabels();
    } catch (err) {
      console.error('Animation loop error:', err);
    }
  }

  animate();
});
