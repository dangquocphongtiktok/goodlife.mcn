/**
 * Goodlife Media - Data Model for 4 Core Interactive Panels
 * Detailed Content: Giới thiệu Founder, Dịch vụ 3 Tabs & Máy tính báo giá, Sensory Before/After, FAQ 5 Accordions & Form
 */

const NODES_DATA = [
  // ==========================================
  // NODE 04 (Chân DNA): 04. FAQ & Đặt Lịch Tư Vấn
  // ==========================================
  {
    id: 4,
    nodeIndex: 0,
    menuIndex: 3, // Menu [04. FAQ]
    title: "04. FAQ & Đặt Lịch Tư Vấn Chiến Lược",
    floatingLabel: "04. FAQ",
    prefixNum: "04.",
    labelTitle: "FAQ",
    nodeLabel: "04. FAQ",
    buildingLabel: "04. FAQ",
    subtitle: "Giải đáp minh bạch pháp lý, chi phí VAT 8%, lịch quay tối ưu & đăng ký tư vấn trực tiếp",
    tagline: "Vành Đai Bảo Mật • Pháp Lý & Hợp Tác Y Tế",
    accentColor: "#10B981", // Emerald
    accentHex: 0x10b981,
    cameraTarget: { y: -2.4, zoom: 6.2, shiftX: -1.7 },
    content: `
      <div class="space-y-6">
        <!-- Banner Intro -->
        <div class="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/25 backdrop-blur-md flex items-start gap-3">
          <div class="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <div>
            <h4 class="text-xs font-bold text-emerald-300 uppercase tracking-wider">Hỗ Trợ Pháp Lý & Hợp Tác Toàn Diện</h4>
            <p class="text-xs text-slate-300 mt-1 leading-relaxed">
              Mọi thắc mắc của Bác sĩ và Quản lý phòng khám về quy trình vận hành, pháp chế y khoa, hóa đơn tài chính và bảo mật kênh đều được Goodlife Media minh bạch hóa 100%.
            </p>
          </div>
        </div>

        <!-- 5 FAQ Accordions -->
        <div>
          <h4 class="text-xs font-semibold tracking-wider uppercase text-emerald-400 mb-3 flex items-center gap-2">
            <span>5 Câu Hỏi Thường Gặp Về Truyền Thông Y Khoa</span>
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-normal">Bác sĩ & Phòng khám quan tâm</span>
          </h4>

          <div class="space-y-2.5" id="faq-accordion-group">
            <!-- FAQ 1: Chi phí & Hóa đơn VAT 8% -->
            <div class="faq-item rounded-xl bg-slate-900/60 border border-slate-700/60 hover:border-emerald-500/40 transition-all overflow-hidden">
              <button class="faq-toggle w-full p-3.5 text-left flex items-center justify-between gap-3 text-white focus:outline-none">
                <span class="text-xs md:text-sm font-semibold flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                  1. Chi phí & hóa đơn VAT 8% được áp dụng như thế nào?
                </span>
                <svg class="faq-icon w-4 h-4 text-emerald-400 shrink-0 transform transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </button>
              <div class="faq-content hidden px-4 pb-4 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 bg-slate-950/40">
                Toàn bộ các gói dịch vụ tại Goodlife Media đều được ký kết hợp đồng pháp nhân đầy đủ và <strong>xuất hóa đơn giá trị gia tăng (VAT + 8%)</strong> theo đúng quy định tài chính hiện hành. Cơ sở y tế hoàn toàn an tâm hạch toán 100% chi phí truyền thông & marketing vào chi phí doanh nghiệp hợp lệ. Báo giá luôn minh bạch, cam kết không phát sinh bất kỳ khoản phí phụ thu nào ngoài hợp đồng.
              </div>
            </div>

            <!-- FAQ 2: Lịch quay tối ưu cho bác sĩ bận rộn -->
            <div class="faq-item rounded-xl bg-slate-900/60 border border-slate-700/60 hover:border-emerald-500/40 transition-all overflow-hidden">
              <button class="faq-toggle w-full p-3.5 text-left flex items-center justify-between gap-3 text-white focus:outline-none">
                <span class="text-xs md:text-sm font-semibold flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                  2. Bác sĩ lịch mổ/khám kín tuần thì lịch quay được tối ưu ra sao?
                </span>
                <svg class="faq-icon w-4 h-4 text-emerald-400 shrink-0 transform transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </button>
              <div class="faq-content hidden px-4 pb-4 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 bg-slate-950/40">
                Áp dụng quy trình chuẩn hóa <strong>"Executive 2-Hour Batch"</strong>: Đội ngũ biên tập viên y khoa của Goodlife nghiên cứu chuyên khoa và soạn sẵn dàn ý kịch bản chi tiết. Bác sĩ <strong>chỉ cần dành đúng 1 buổi (khoảng 2 tiếng) mỗi tháng</strong> tại chính phòng khám hoặc studio. Ekip 1 camera chuyên nghiệp + 1 biên tập viên sẽ đồng hành hỗ trợ, nhắc thoại gợi ý tự nhiên giúp Bác sĩ ghi hình 30 video nhẹ nhàng mà không gián đoạn lịch khám chữa bệnh.
              </div>
            </div>

            <!-- FAQ 3: Bảo mật MCN TikTok không lo mất kênh/dính gậy -->
            <div class="faq-item rounded-xl bg-slate-900/60 border border-slate-700/60 hover:border-emerald-500/40 transition-all overflow-hidden">
              <button class="faq-toggle w-full p-3.5 text-left flex items-center justify-between gap-3 text-white focus:outline-none">
                <span class="text-xs md:text-sm font-semibold flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                  3. Quyền lợi khi gia nhập MCN TikTok của Goodlife là gì?
                </span>
                <svg class="faq-icon w-4 h-4 text-emerald-400 shrink-0 transform transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </button>
              <div class="faq-content hidden px-4 pb-4 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 bg-slate-950/40">
                Là <strong>MCN đối tác chính thức của TikTok tại Việt Nam</strong>, Goodlife Media cung cấp "khiên chắn bảo hộ" toàn diện cho kênh: (1) Cố vấn từ khóa y tế tránh vi phạm chính sách kiểm duyệt khắt khe; (2) Kết nối đường dây hỗ trợ trực tiếp với đại diện TikTok để gỡ gậy, kháng nghị video bị gắn cờ sai sót; (3) Bảo vệ kênh khỏi các cuộc tấn công chiếm quyền hoặc report ác ý từ đối thủ cạnh tranh.
              </div>
            </div>

            <!-- FAQ 4: Thuê gói dịch vụ riêng lẻ linh hoạt -->
            <div class="faq-item rounded-xl bg-slate-900/60 border border-slate-700/60 hover:border-emerald-500/40 transition-all overflow-hidden">
              <button class="faq-toggle w-full p-3.5 text-left flex items-center justify-between gap-3 text-white focus:outline-none">
                <span class="text-xs md:text-sm font-semibold flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                  4. Phòng khám có thể thuê các gói dịch vụ riêng lẻ linh hoạt không?
                </span>
                <svg class="faq-icon w-4 h-4 text-emerald-400 shrink-0 transform transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </button>
              <div class="faq-content hidden px-4 pb-4 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 bg-slate-950/40">
                <strong>Hoàn toàn linh hoạt!</strong> Nếu phòng khám đã có nhân sự tự quay hoặc đã có kịch bản, bạn có thể lựa chọn từng module độc lập: chỉ thuê dựng hậu kỳ (6 triệu/tháng cho 30 video), chỉ thuê buổi quay (2.5 triệu/buổi), viết bài Fanpage (2 triệu/20 bài), hoặc bảo vệ kênh TikTok (2 triệu/tháng). Quý Bác sĩ có thể dùng công cụ tính giá tự động ở Tab 2 để tùy biến gói phù hợp nhất với ngân sách.
              </div>
            </div>

            <!-- FAQ 5: Quy trình khảo sát Sensory Design -->
            <div class="faq-item rounded-xl bg-slate-900/60 border border-slate-700/60 hover:border-emerald-500/40 transition-all overflow-hidden">
              <button class="faq-toggle w-full p-3.5 text-left flex items-center justify-between gap-3 text-white focus:outline-none">
                <span class="text-xs md:text-sm font-semibold flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                  5. Quy trình khảo sát & thiết kế Sensory Design diễn ra thế nào?
                </span>
                <svg class="faq-icon w-4 h-4 text-emerald-400 shrink-0 transform transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </button>
              <div class="faq-content hidden px-4 pb-4 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 bg-slate-950/40">
                Gồm 4 giai đoạn chuẩn mực: (1) <strong>Khảo sát thực địa:</strong> Đo lường cường độ sáng Lux, tần số tiếng ồn dBA và luồng khí phòng khám; (2) <strong>Thiết kế giải pháp giác quan:</strong> Mô phỏng ánh sáng sinh học Circadian, bản đồ âm học khử ồn, hệ hương thảo dược trị liệu đạt chuẩn y khoa; (3) <strong>Thi công & tích hợp thiết bị:</strong> Triển khai nhanh gọn không làm gián đoạn giờ khám bệnh; (4) <strong>Kiểm chứng NPS:</strong> Đo lường mức độ hài lòng và giảm chỉ số lo âu của bệnh nhân sau 30 ngày vận hành.
              </div>
            </div>
          </div>
        </div>

        <!-- Inline Consultation Form -->
        <div class="p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-emerald-950/40 border border-emerald-500/30 shadow-xl shadow-emerald-950/30">
          <div class="flex items-center gap-3 mb-4 pb-3 border-b border-emerald-500/20">
            <div class="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
            </div>
            <div>
              <h4 class="text-sm font-bold text-white">Đăng Ký Nhận Tư Vấn Chiến Lược</h4>
              <p class="text-[11px] text-emerald-300">Buổi thẩm định hồ sơ thương hiệu 60 phút trực tiếp cùng Founder Đặng Quốc Phong</p>
            </div>
          </div>

          <form id="inline-consult-form" class="space-y-3">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-[10px] font-medium text-slate-300 uppercase tracking-wider mb-1">Họ tên Bác sĩ / Quản lý *</label>
                <input type="text" id="inline-fullname" name="fullname" required placeholder="BS. Nguyễn Văn A..." class="w-full px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400">
              </div>
              <div>
                <label class="block text-[10px] font-medium text-slate-300 uppercase tracking-wider mb-1">Số điện thoại / Zalo *</label>
                <input type="tel" id="inline-phone" name="phone" required placeholder="090 123 4567..." class="w-full px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400">
              </div>
            </div>

            <div>
              <label class="block text-[10px] font-medium text-slate-300 uppercase tracking-wider mb-1">Cơ sở y tế / Chuyên khoa</label>
              <input type="text" id="inline-facility" name="facility" placeholder="Phòng khám Nha khoa, Thẩm mỹ, Da liễu, Sản phụ khoa..." class="w-full px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400">
            </div>

            <div>
              <label class="block text-[10px] font-medium text-slate-300 uppercase tracking-wider mb-1">Nhu cầu tư vấn trọng tâm</label>
              <select id="inline-service" name="service" class="w-full px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-700/80 text-xs text-white focus:outline-none focus:border-emerald-400">
                <option>Gói Truyền Thông Trọn Gói 25 triệu/tháng (30 video + MCN + Ads)</option>
                <option>Gói Truyền Thông Tiêu Chuẩn 15 triệu/tháng (30 video + MCN)</option>
                <option>Gói Dịch Vụ Riêng Lẻ (Kịch bản, Quay, Dựng, SEO)</option>
                <option>Tư vấn thiết kế Sensory Design phòng khám</option>
                <option>Bảo vệ kênh TikTok & Kháng nghị bản quyền y khoa</option>
              </select>
            </div>

            <div class="pt-1">
              <button type="submit" class="w-full py-2.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                <span>Gửi Yêu Cầu Tư Vấn Ngay</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
              <p class="text-[10px] text-center text-slate-400 mt-2">Dữ liệu sẽ được gửi thẳng đến email <strong class="text-emerald-400 font-mono">goodlife.mcn@gmail.com</strong></p>
            </div>
          </form>
        </div>
      </div>
    `
  },

  // ==========================================
  // NODE 03 (Thân dưới DNA): 03. Sensory Design
  // ==========================================
  {
    id: 3,
    nodeIndex: 1,
    menuIndex: 2, // Menu [03. Sensory Design]
    title: "03. Thiết Kế Sensory Design Cho Phòng Khám",
    floatingLabel: "03. Thiết Kế Sensory Design Cho Phòng Khám",
    prefixNum: "03.",
    labelTitle: "Thiết Kế Sensory Design Cho Phòng Khám",
    nodeLabel: "03. Sensory Design",
    buildingLabel: "03. Sensory Design",
    subtitle: "Thiết kế Ánh sáng, Mùi hương, Âm thanh & Phần nhìn — Xóa bỏ căng thẳng khi đi khám",
    tagline: "Lăng Kính Cảm Xúc • Kiến Trúc Giác Quan Y Sinh",
    accentColor: "#F59E0B", // Amber Gold
    accentHex: 0xf59e0b,
    cameraTarget: { y: -0.8, zoom: 6.2, shiftX: -1.7 },
    content: `
      <div class="space-y-6">
        <!-- Intro Card -->
        <div class="p-4 rounded-xl bg-amber-950/40 border border-amber-500/25 backdrop-blur-md">
          <p class="text-xs text-amber-200 leading-relaxed">
            <strong>Sensory Design by Goodlife Media</strong> là giải pháp kiến trúc đa giác quan y sinh học đầu tiên tại Việt Nam, kết hợp <strong>Ánh sáng – Mùi hương – Âm thanh – Phần nhìn</strong> nhằm giải tỏa nỗi sợ hãi phòng khám (Hội chứng áo choàng trắng) của 72% bệnh nhân, mang lại cảm giác thư thái và nâng tầm vị thế cơ sở y tế 5 sao.
          </p>
        </div>

        <!-- 4 Sensory Feature Buttons -->
        <div>
          <div class="flex items-center justify-between mb-2.5">
            <h4 class="text-xs font-semibold tracking-wider uppercase text-amber-400">4 Trục Trải Nghiệm Giác Quan</h4>
            <span class="text-[10px] text-slate-400">Bấm nút để tương tác mô phỏng</span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2" id="sensory-buttons-group">
            <button class="sensory-btn active px-2.5 py-2 rounded-lg bg-amber-500/20 border border-amber-500/60 text-amber-300 text-xs font-medium transition-all flex flex-col items-center gap-1" data-mode="light">
              <span class="text-base">💡</span>
              <span>Ánh Sáng</span>
            </button>
            <button class="sensory-btn px-2.5 py-2 rounded-lg bg-slate-900/60 border border-slate-700/60 text-slate-300 hover:text-white text-xs font-medium transition-all flex flex-col items-center gap-1" data-mode="scent">
              <span class="text-base">🌿</span>
              <span>Mùi Hương</span>
            </button>
            <button class="sensory-btn px-2.5 py-2 rounded-lg bg-slate-900/60 border border-slate-700/60 text-slate-300 hover:text-white text-xs font-medium transition-all flex flex-col items-center gap-1" data-mode="sound">
              <span class="text-base">🎵</span>
              <span>Âm Thanh</span>
            </button>
            <button class="sensory-btn px-2.5 py-2 rounded-lg bg-slate-900/60 border border-slate-700/60 text-slate-300 hover:text-white text-xs font-medium transition-all flex flex-col items-center gap-1" data-mode="visual">
              <span class="text-base">👁️</span>
              <span>Phần Nhìn</span>
            </button>
          </div>
        </div>

        <!-- Interactive 3D Before / After Visualizer Frame with REAL Clinic Photos -->
        <div class="rounded-2xl overflow-hidden border border-amber-500/40 bg-slate-950 shadow-2xl relative">
          <!-- State Label Top Header -->
          <div class="p-3 bg-slate-900/90 border-b border-white/10 flex items-center justify-between text-xs">
            <span class="font-bold text-slate-200 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              <span id="sensory-current-label">Trục Ánh Sáng: Phòng Chờ Trước vs Sau Thiết Kế</span>
            </span>
            <span class="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold border border-amber-500/30">
              Kéo Thanh Trượt So Sánh
            </span>
          </div>

          <!-- Split Visualizer Image Container -->
          <div class="relative h-64 sm:h-72 w-full select-none overflow-hidden bg-slate-950" id="sensory-visualizer">
            <!-- Background Layer (AFTER: Sensory Design by Goodlife) -->
            <div id="sensory-layer-after" class="absolute inset-0 w-full h-full overflow-hidden">
              <img id="img-sensory-after" src="assets/clinic-after.jpg" alt="Phòng chờ sau thiết kế Sensory Design" class="w-full h-full object-cover">
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/30 pointer-events-none"></div>
              
              <!-- Fixed Top-Right Badge for AFTER -->
              <div class="absolute top-3 right-3 z-10 pointer-events-none">
                <span class="text-[11px] px-3 py-1 rounded-full bg-emerald-500/90 text-slate-950 font-extrabold shadow-lg border border-emerald-300/40 flex items-center gap-1.5 backdrop-blur-sm">
                  <span>✨</span>
                  <span>SAU: Phòng Chờ Sensory Design</span>
                </span>
              </div>
            </div>

            <!-- Foreground Layer (BEFORE: Outdated Clinic, clipped by polygon) -->
            <div id="sensory-layer-before" class="absolute inset-0 w-full h-full overflow-hidden z-10" style="clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);">
              <img id="img-sensory-before" src="assets/clinic-before.jpg" alt="Phòng chờ cũ trước cải tạo" class="w-full h-full object-cover">
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/30 pointer-events-none"></div>
              
              <!-- Fixed Top-Left Badge for BEFORE -->
              <div class="absolute top-3 left-3 z-10 pointer-events-none">
                <span class="text-[11px] px-3 py-1 rounded-full bg-rose-600/90 text-white font-extrabold shadow-lg border border-rose-300/40 flex items-center gap-1.5 backdrop-blur-sm">
                  <span>⚠️</span>
                  <span>TRƯỚC: Phòng Chờ Cũ</span>
                </span>
              </div>
            </div>

            <!-- Vertical Glowing Split Divider Line -->
            <div id="sensory-divider-line" class="absolute top-0 bottom-0 w-0.5 bg-amber-400 shadow-[0_0_12px_#f59e0b] z-20 pointer-events-none" style="left: 50%;"></div>

            <!-- Draggable Split Handle Icon -->
            <div id="sensory-slider-handle" class="absolute top-1/2 -translate-y-1/2 w-8 h-8 -ml-4 flex items-center justify-center z-25 pointer-events-none" style="left: 50%;">
              <div class="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shadow-xl shadow-amber-500/60 border-2 border-white transition-transform hover:scale-110">
                ↔
              </div>
            </div>

            <!-- Range input overlay for smooth slider interaction -->
            <input type="range" min="0" max="100" value="50" id="sensory-range-slider" class="absolute inset-0 opacity-0 cursor-ew-resize z-30 w-full h-full">
          </div>

          <!-- Bottom Slider Helper Instructions -->
          <div class="p-2.5 bg-slate-900/90 text-center text-[10px] text-slate-400 border-t border-white/5 flex items-center justify-center gap-2">
            <span>👈 Kéo sang trái để xem toàn cảnh <strong>SAU</strong></span>
            <span>•</span>
            <span>Kéo sang phải để xem <strong>TRƯỚC</strong> 👉</span>
          </div>
        </div>

        <!-- Comparative Explanation Card Placed CLEANLY BELOW the Images -->
        <div class="p-4 rounded-xl bg-slate-900/80 border border-amber-500/30 shadow-lg">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
            <!-- Col BEFORE -->
            <div class="space-y-1.5 sm:pr-3 pb-3 sm:pb-0">
              <div class="flex items-center justify-between">
                <span class="text-[10px] uppercase font-bold text-rose-400 tracking-wider">Phòng Chờ Trước Cải Tạo</span>
                <span class="text-[10px] font-mono text-slate-400 font-semibold" id="sensory-spec-before">Huỳnh quang 6500K</span>
              </div>
              <h5 class="text-xs font-bold text-slate-200" id="sensory-title-before">Ánh Sáng Trắng Gay Gắt</h5>
              <p class="text-[11px] text-slate-400 leading-relaxed" id="sensory-desc-before">
                Đèn huỳnh quang 6500K gây lóa mắt, kích thích hệ thần kinh giao cảm khiến bệnh nhân bồn chồn, tim đập nhanh và tăng huyết áp tâm lý khi ngồi chờ.
              </p>
            </div>

            <!-- Col AFTER -->
            <div class="space-y-1.5 sm:pl-3 pt-3 sm:pt-0">
              <div class="flex items-center justify-between">
                <span class="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Phòng Chờ Sau Thiết Kế Sensory</span>
                <span class="text-[10px] font-mono text-amber-300 font-bold" id="sensory-spec-after">Circadian 2700K - 4000K</span>
              </div>
              <h5 class="text-xs font-bold text-white" id="sensory-title-after">Ánh Sáng Sinh Học Tự Nhiên</h5>
              <p class="text-[11px] text-amber-100/90 leading-relaxed" id="sensory-desc-after">
                Tái tạo chu kỳ bình minh – hoàng hôn, làm dịu võng mạc và giảm 38% hormone căng thẳng cortisol của bệnh nhân trong lúc chờ khám.
              </p>
            </div>
          </div>
        </div>

        <!-- 4 Sensory Details Description Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3" id="sensory-details-cards">
          <div class="p-3.5 rounded-xl bg-slate-900/60 border border-amber-500/20 hover:border-amber-400/50 transition-all">
            <div class="flex items-center gap-2 mb-1.5">
              <span class="text-base">💡</span>
              <h5 class="text-xs font-bold text-white">Thị Giác (Circadian Lighting)</h5>
            </div>
            <p class="text-[11px] text-slate-300 leading-relaxed">
              Chiếu sáng phân vùng y sinh: Sảnh chờ dịu ấm như phòng khách sạn cao cấp, phòng thủ thuật sắc nét chuẩn phẫu thuật.
            </p>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-900/60 border border-amber-500/20 hover:border-amber-400/50 transition-all">
            <div class="flex items-center gap-2 mb-1.5">
              <span class="text-base">🌿</span>
              <h5 class="text-xs font-bold text-white">Khứu Giác (Medical Aromatherapy)</h5>
            </div>
            <p class="text-[11px] text-slate-300 leading-relaxed">
              Xóa sạch 100% mùi cồn và thuốc sát trùng lạnh lẽo, giải phóng vi hạt tinh dầu tràm trà & hoa oải hương kháng khuẩn trị liệu.
            </p>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-900/60 border border-amber-500/20 hover:border-amber-400/50 transition-all">
            <div class="flex items-center gap-2 mb-1.5">
              <span class="text-base">🎵</span>
              <h5 class="text-xs font-bold text-white">Thính Giác (Psychoacoustics)</h5>
            </div>
            <p class="text-[11px] text-slate-300 leading-relaxed">
              Tiêu âm khử tiếng rít mũi khoan nha khoa / máy monitor, thay bằng tần số âm thanh 432Hz xoa dịu sóng não alpha.
            </p>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-900/60 border border-amber-500/20 hover:border-amber-400/50 transition-all">
            <div class="flex items-center gap-2 mb-1.5">
              <span class="text-base">👁️</span>
              <h5 class="text-xs font-bold text-white">Phần Nhìn (Biophilic Aesthetics)</h5>
            </div>
            <p class="text-[11px] text-slate-300 leading-relaxed">
              Vật liệu gỗ ấm, mảng xanh tự nhiên và bo cong kính mờ, loại bỏ cảm giác góc cạnh lạnh lẽo của cơ sở y tế thông thường.
            </p>
          </div>
        </div>

        <!-- Measurable Clinical Proof -->
        <div class="p-4 rounded-xl bg-slate-900/70 border border-amber-500/30">
          <div class="flex items-center justify-between text-xs mb-2">
            <span class="font-semibold text-slate-200">Hiệu Quả Thực Chứng Tại Các Phòng Khám:</span>
            <span class="text-amber-400 font-mono font-bold">+68% Điểm Hài Lòng NPS</span>
          </div>
          <div class="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div class="bg-gradient-to-r from-amber-500 to-emerald-400 h-1.5 rounded-full" style="width: 88%"></div>
          </div>
          <p class="text-[11px] text-slate-400 mt-2 leading-relaxed">
            Bệnh nhân giảm 45% cảm giác chờ đợi mệt mỏi, tỷ lệ đồng ý tiến hành liệu trình điều trị chuyên sâu tăng 35% nhờ tâm lý an tâm tuyệt đối.
          </p>
        </div>
      </div>
    `
  },

  // ==========================================
  // NODE 02 (Thân trên DNA): 02. Dịch vụ & Báo giá
  // ==========================================
  {
    id: 2,
    nodeIndex: 2,
    menuIndex: 1, // Menu [02. Dịch vụ & Báo giá]
    title: "02. Dịch Vụ & Bảng Giá Minh Bạch",
    floatingLabel: "02. Dịch Vụ & Bảng Giá",
    prefixNum: "02.",
    labelTitle: "Dịch Vụ & Bảng Giá",
    nodeLabel: "02. Dịch Vụ & Bảng Giá",
    buildingLabel: "02. Dịch Vụ & Bảng Giá",
    subtitle: "3 Tab: Gói Video Trọn Gói • Các Gói Dịch Vụ Riêng Biệt (Tùy Chọn) • Dịch Vụ Mở Rộng",
    tagline: "Thấu Kính Media • Sản Xuất & Tăng Trưởng",
    accentColor: "#00A896", // Teal
    accentHex: 0x00a896,
    cameraTarget: { y: 0.8, zoom: 6.2, shiftX: -1.7 },
    content: `
      <div class="space-y-5">
        <!-- 3 Tab Navigation Header -->
        <div class="flex rounded-xl bg-slate-900/90 p-1 border border-teal-500/30" id="pricing-tabs-header">
          <button class="pricing-tab-btn active flex-1 py-2 px-2.5 rounded-lg text-xs font-semibold text-teal-300 bg-teal-500/20 border border-teal-500/40 transition-all flex items-center justify-center gap-1.5" data-tab="tab-full">
            <span>📹 Gói Trọn Gói</span>
          </button>
          <button class="pricing-tab-btn flex-1 py-2 px-2.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition-all flex items-center justify-center gap-1.5" data-tab="tab-custom">
            <span>⚙️ Gói Riêng Biệt</span>
          </button>
          <button class="pricing-tab-btn flex-1 py-2 px-2.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition-all flex items-center justify-center gap-1.5" data-tab="tab-addon">
            <span>🏥 Dịch Vụ Mở Rộng</span>
          </button>
        </div>

        <!-- ================= TAB 1: GÓI TRỌN GÓI ================= -->
        <div id="tab-full" class="pricing-tab-pane space-y-4">
          <!-- Gói Trọn Gói (25 Triệu - BEST CHOICE) -->
          <div class="p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 via-teal-950/40 to-slate-900/90 border-2 border-teal-400/60 shadow-xl shadow-teal-500/15 relative overflow-hidden">
            <div class="absolute top-0 right-0 bg-gradient-to-l from-teal-500 to-cyan-400 text-slate-950 text-[10px] font-extrabold px-3 py-1 rounded-bl-lg uppercase tracking-wider shadow">
              ⭐ NỔI BẬT NHẤT
            </div>

            <div class="flex items-baseline justify-between mb-2">
              <div>
                <span class="text-xs font-bold uppercase tracking-wider text-teal-300">Gói Truyền Thông Video Ngắn</span>
                <h4 class="text-lg font-extrabold text-white">GÓI TRỌN GÓI</h4>
              </div>
              <div class="text-right">
                <span class="text-2xl font-black text-teal-400 font-mono">25.000.000</span>
                <span class="text-xs text-slate-400"> VNĐ/tháng</span>
              </div>
            </div>

            <p class="text-xs text-slate-300 mb-4 pb-3 border-b border-teal-500/20">
              Giải pháp toàn diện tối ưu từ A-Z giúp bác sĩ & phòng khám sở hữu hệ thống kênh uy tín chuẩn y khoa, chuyển đổi bệnh nhân vượt trội.
            </p>

            <ul class="text-xs text-slate-200 space-y-2">
              <li class="flex items-start gap-2">
                <svg class="w-4 h-4 text-teal-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                <span><strong>Định hướng chiến lược nội dung:</strong> Xây dựng tuyến bài chuyên môn chuẩn y đức.</span>
              </li>
              <li class="flex items-start gap-2">
                <svg class="w-4 h-4 text-teal-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                <span><strong>Xây dựng hệ thống kênh bền vững:</strong> Không lo bị hack, kháng nghị bản quyền.</span>
              </li>
              <li class="flex items-start gap-2">
                <svg class="w-4 h-4 text-teal-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                <span><strong>Lên kịch bản, quay & dựng 30 video clip/tháng:</strong> Đạt chuẩn 4K, đồ họa y khoa sinh động.</span>
              </li>
              <li class="flex items-start gap-2">
                <svg class="w-4 h-4 text-teal-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                <span><strong>Đăng video đa nền tảng:</strong> Phủ sóng TikTok, Facebook Reels, YouTube Shorts.</span>
              </li>
              <li class="flex items-start gap-2">
                <svg class="w-4 h-4 text-teal-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                <span><strong>Trực kênh & phản hồi đặt lịch:</strong> Tiếp nhận thông tin bệnh nhân, gửi câu hỏi chuyên môn đến bác sĩ.</span>
              </li>
              <li class="flex items-start gap-2">
                <svg class="w-4 h-4 text-teal-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                <span><strong>Viết 20 bài viết & hỗ trợ SEO:</strong> Bài viết chuyên sâu Fanpage & tối ưu từ khóa tìm kiếm.</span>
              </li>
              <li class="flex items-start gap-2">
                <svg class="w-4 h-4 text-teal-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                <span><strong>Gia nhập MCN TikTok Goodlife:</strong> Bảo vệ tài khoản độc quyền, gỡ gậy chính sách.</span>
              </li>
              <li class="flex items-start gap-2">
                <svg class="w-4 h-4 text-teal-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                <span><strong>Hỗ trợ chạy quảng cáo:</strong> Tối ưu lượt xem đúng đối tượng bệnh nhân khu vực.</span>
              </li>
            </ul>

            <div class="mt-4 pt-3 border-t border-teal-500/20 flex items-center justify-between">
              <span class="text-[11px] text-teal-300 font-medium">Cam kết KPI lượt xem & tiếp cận</span>
              <button onclick="openConsultationModalWithService('Gói Trọn Gói 25 Triệu/Tháng')" class="px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-teal-400 to-cyan-300 rounded-lg hover:brightness-110 shadow-lg shadow-teal-500/30 transition-all cursor-pointer">
                Đăng Ký Gói Này
              </button>
            </div>
          </div>

          <!-- Gói Tiêu Chuẩn (15 Triệu) -->
          <div class="p-4 rounded-xl bg-slate-900/70 border border-slate-700/60 hover:border-teal-500/40 transition-all">
            <div class="flex items-baseline justify-between mb-2">
              <div>
                <span class="text-xs font-semibold uppercase text-slate-400">Gói Khởi Động Kênh</span>
                <h4 class="text-base font-bold text-white">GÓI TIÊU CHUẨN</h4>
              </div>
              <div class="text-right">
                <span class="text-xl font-bold text-white font-mono">15.000.000</span>
                <span class="text-xs text-slate-400"> VNĐ/tháng</span>
              </div>
            </div>

            <ul class="text-xs text-slate-300 space-y-1.5 mt-2">
              <li class="flex items-center gap-2">• Định hướng chiến lược nội dung chuẩn y khoa</li>
              <li class="flex items-center gap-2">• Xây dựng hệ thống kênh bền vững, an toàn</li>
              <li class="flex items-center gap-2">• Lên kịch bản, quay & dựng 30 video/tháng</li>
              <li class="flex items-center gap-2">• Đăng video đa nền tảng (TikTok, Reels, Shorts)</li>
              <li class="flex items-center gap-2">• Trực kênh và phản hồi thông tin đặt lịch tới bác sĩ</li>
              <li class="flex items-center gap-2">• Gia nhập MCN TikTok của Goodlife để bảo vệ tài khoản</li>
            </ul>

            <div class="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between">
              <span class="text-[11px] text-slate-400">Phù hợp bác sĩ bắt đầu xây kênh</span>
              <button onclick="openConsultationModalWithService('Gói Tiêu Chuẩn 15 Triệu/Tháng')" class="px-3.5 py-1.5 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-600 transition-all cursor-pointer">
                Chọn Gói Tiêu Chuẩn
              </button>
            </div>
          </div>
        </div>

        <!-- ================= TAB 2: CÁC GÓI RIÊNG BIỆT (INTERACTIVE CALCULATOR) ================= -->
        <div id="tab-custom" class="pricing-tab-pane hidden space-y-4">
          <div class="p-3.5 rounded-xl bg-slate-900/80 border border-teal-500/20 text-xs text-slate-300 flex items-center justify-between">
            <span>Tích chọn các dịch vụ bên dưới để xem <strong>báo giá linh hoạt theo nhu cầu:</strong></span>
            <span class="text-[11px] text-teal-400 font-mono font-bold" id="selected-count-badge">0 gói đã chọn</span>
          </div>

          <!-- Interactive Service List Checkboxes -->
          <div class="space-y-2.5" id="custom-services-list">
            <!-- Item 1 -->
            <label class="custom-calc-item p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/40 transition-all flex items-start gap-3 cursor-pointer">
              <input type="checkbox" class="service-checkbox mt-1 accent-teal-500 w-4 h-4" data-price="3000000" data-name="Tư vấn & Kịch bản chi tiết">
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-white">1. Tư Vấn & Xây Dựng Concept Kịch Bản Chi Tiết</span>
                  <span class="text-xs font-mono font-bold text-teal-400">3.000.000 đ/th</span>
                </div>
                <p class="text-[11px] text-slate-400 mt-0.5">2 buổi tư vấn chuyên sâu/tháng trực tiếp trước ngày quay; định vị phong cách, thông điệp chuyên môn và biên soạn kịch bản chi tiết.</p>
              </div>
            </label>

            <!-- Item 2: Quay Hình & Di Chuyển (Có Chọn Số Buổi) -->
            <div class="custom-calc-item p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/40 transition-all flex flex-col gap-2.5">
              <div class="flex items-start gap-3">
                <input type="checkbox" id="cb-quay-hinh" class="service-checkbox mt-1 accent-teal-500 w-4 h-4 cursor-pointer" data-base-price="2500000" data-price="2500000" data-name="Quay hình & Di chuyển (1 buổi)">
                <div class="flex-1">
                  <div class="flex items-center justify-between">
                    <label for="cb-quay-hinh" class="text-xs font-bold text-white cursor-pointer hover:text-teal-300 transition-colors">2. Quay Hình & Di Chuyển</label>
                    <span class="text-xs font-mono font-bold text-teal-400" id="quay-hinh-subtotal">2.500.000 đ/buổi</span>
                  </div>
                  <p class="text-[11px] text-slate-400 mt-0.5">1 camera chuyên nghiệp, 1 biên tập viên hỗ trợ diễn xuất & gợi ý lời thoại (áp dụng nội khu TP.HCM).</p>
                </div>
              </div>

              <!-- Quantity Stepper Controls for Shooting Sessions -->
              <div class="ml-7 pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2" id="quay-stepper-container">
                <div class="flex items-center gap-1.5">
                  <span class="text-[11px] text-teal-300 font-medium">Số buổi quay:</span>
                  <div class="flex items-center bg-slate-950/90 rounded-lg border border-teal-500/30 overflow-hidden">
                    <button type="button" id="btn-dec-quay" class="w-6 h-6 bg-slate-800/80 hover:bg-teal-500/30 text-teal-300 text-xs font-bold flex items-center justify-center transition-colors cursor-pointer select-none">−</button>
                    <span id="quay-sessions-count" class="font-mono text-xs font-bold text-white w-7 text-center">1</span>
                    <button type="button" id="btn-inc-quay" class="w-6 h-6 bg-slate-800/80 hover:bg-teal-500/30 text-teal-300 text-xs font-bold flex items-center justify-center transition-colors cursor-pointer select-none">+</button>
                  </div>
                  <span class="text-[10px] text-slate-400 font-medium">buổi</span>
                </div>

                <!-- Quick Presets -->
                <div class="flex items-center gap-1">
                  <button type="button" class="btn-preset-quay px-2 py-0.5 rounded text-[10px] bg-slate-800 hover:bg-teal-500/20 text-slate-300 hover:text-teal-300 border border-slate-700/60 transition-all cursor-pointer" data-sessions="1">1 buổi</button>
                  <button type="button" class="btn-preset-quay px-2 py-0.5 rounded text-[10px] bg-slate-800 hover:bg-teal-500/20 text-slate-300 hover:text-teal-300 border border-slate-700/60 transition-all cursor-pointer" data-sessions="2">2 buổi</button>
                  <button type="button" class="btn-preset-quay px-2 py-0.5 rounded text-[10px] bg-slate-800 hover:bg-teal-500/20 text-slate-300 hover:text-teal-300 border border-slate-700/60 transition-all cursor-pointer" data-sessions="4">4 buổi</button>
                </div>
              </div>
            </div>

            <!-- Item 3 -->
            <label class="custom-calc-item p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/40 transition-all flex items-start gap-3 cursor-pointer">
              <input type="checkbox" class="service-checkbox mt-1 accent-teal-500 w-4 h-4" data-price="6000000" data-name="Dựng & Hậu kỳ 30 video">
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-white">3. Dựng & Hậu Kỳ Video Hoàn Thiện</span>
                  <span class="text-xs font-mono font-bold text-teal-400">6.000.000 đ/th</span>
                </div>
                <p class="text-[11px] text-slate-400 mt-0.5">Dựng hoàn thiện khoảng 30 video/tháng; cắt ghép nhịp điệu cuốn hút, âm thanh, đồ họa chữ, hiệu chỉnh màu sắc cá nhân.</p>
              </div>
            </label>

            <!-- Item 4 -->
            <label class="custom-calc-item p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/40 transition-all flex items-start gap-3 cursor-pointer">
              <input type="checkbox" class="service-checkbox mt-1 accent-teal-500 w-4 h-4" data-price="2000000" data-name="Quản lý kênh & Đăng bài">
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-white">4. Quản Lý Kênh, Đăng Bài & Phản Hồi Tư Vấn</span>
                  <span class="text-xs font-mono font-bold text-teal-400">2.000.000 đ/th</span>
                </div>
                <p class="text-[11px] text-slate-400 mt-0.5">Đăng video chuẩn khung giờ vàng, kiểm duyệt bình luận, chuyển tiếp câu hỏi bệnh nhân đến phòng khám.</p>
              </div>
            </label>

            <!-- Item 5 -->
            <label class="custom-calc-item p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/40 transition-all flex items-start gap-3 cursor-pointer">
              <input type="checkbox" class="service-checkbox mt-1 accent-teal-500 w-4 h-4" data-price="2000000" data-name="Bảo vệ kênh TikTok">
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-white">5. Bảo Vệ Kênh TikTok (Kháng Gậy & Mất Kênh)</span>
                  <span class="text-xs font-mono font-bold text-teal-400">2.000.000 đ/th</span>
                </div>
                <p class="text-[11px] text-slate-400 mt-0.5">Gia nhập MCN đối tác TikTok bảo hộ độc quyền; xử lý vi phạm chính sách y tế (áp dụng kênh từ 1.000 follow trở lên).</p>
              </div>
            </label>

            <!-- Item 6 -->
            <label class="custom-calc-item p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/40 transition-all flex items-start gap-3 cursor-pointer">
              <input type="checkbox" class="service-checkbox mt-1 accent-teal-500 w-4 h-4" data-price="2000000" data-name="Viết bài Fanpage 20 bài">
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-white">6. Viết Bài Fanpage Chuẩn Y Khoa</span>
                  <span class="text-xs font-mono font-bold text-teal-400">2.000.000 đ/th</span>
                </div>
                <p class="text-[11px] text-slate-400 mt-0.5">20 bài viết chuyên sâu về bệnh học, hướng dẫn chăm sóc sức khỏe kèm hình ảnh đồ họa đồng bộ.</p>
              </div>
            </label>

            <!-- Item 7 -->
            <label class="custom-calc-item p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/40 transition-all flex items-start gap-3 cursor-pointer">
              <input type="checkbox" class="service-checkbox mt-1 accent-teal-500 w-4 h-4" data-price="1000000" data-name="Tối ưu hóa SEO đa nền tảng">
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-white">7. Tối Ưu Hóa SEO Đa Nền Tảng</span>
                  <span class="text-xs font-mono font-bold text-teal-400">1.000.000 đ/th</span>
                </div>
                <p class="text-[11px] text-slate-400 mt-0.5">Tối ưu thẻ mô tả, hashtag, từ khóa tìm kiếm để video và bài viết hiển thị top đầu tìm kiếm người bệnh.</p>
              </div>
            </label>

            <!-- Item 8 -->
            <label class="custom-calc-item p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/40 transition-all flex items-start gap-3 cursor-pointer">
              <input type="checkbox" class="service-checkbox mt-1 accent-teal-500 w-4 h-4" data-price="1000000" data-name="Công chạy Quảng Cáo TikTok">
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-white">8. Quản Trị Quảng Cáo Thương Hiệu TikTok</span>
                  <span class="text-xs font-mono font-bold text-teal-400">Từ 1.000.000 đ/th</span>
                </div>
                <p class="text-[11px] text-slate-400 mt-0.5">Tài khoản TKKH chuẩn (xuất hóa đơn về khách hàng). Ngân sách &lt; 15tr phí công 1.000.000đ; ngân sách lớn hơn phí 5% – 7%.</p>
              </div>
            </label>
          </div>

          <!-- Total Calculation Sticky Bottom Bar -->
          <div class="p-4 rounded-xl bg-gradient-to-r from-slate-900 to-teal-950 border-2 border-teal-500/50 flex items-center justify-between">
            <div>
              <p class="text-[10px] text-slate-400 uppercase font-semibold">Tổng Chi Phí Các Gói Đã Chọn:</p>
              <p class="text-lg font-black text-teal-300 font-mono" id="custom-total-price">0 VNĐ</p>
            </div>
            <button id="btn-request-custom" onclick="requestCustomSelection()" class="px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-teal-400 to-cyan-300 rounded-lg hover:brightness-110 shadow-lg shadow-teal-500/30 transition-all cursor-pointer">
              Nhận Báo Giá Gói Đã Chọn
            </button>
          </div>
        </div>

        <!-- ================= TAB 3: DỊCH VỤ MỞ RỘNG ================= -->
        <div id="tab-addon" class="pricing-tab-pane hidden space-y-3">
          <div class="p-4 rounded-xl bg-slate-900/70 border border-slate-700/60 hover:border-teal-500/40 transition-all">
            <div class="flex items-baseline justify-between mb-1.5">
              <h5 class="text-sm font-bold text-white flex items-center gap-2">
                <span class="text-base">🌐</span>
                <span>Thiết Kế & Xây Dựng Website Phòng Khám</span>
              </h5>
              <span class="text-xs font-mono font-bold text-teal-400">Chỉ từ 5.000.000 đ</span>
            </div>
            <p class="text-xs text-slate-300 leading-relaxed">
              Website chuẩn y khoa tương thích di động, tối ưu tốc độ tải trang, tích hợp form đặt lịch khám, hồ sơ bác sĩ và hệ thống bài viết chuyên khoa chuẩn SEO.
            </p>
          </div>

          <div class="p-4 rounded-xl bg-slate-900/70 border border-slate-700/60 hover:border-teal-500/40 transition-all">
            <div class="flex items-baseline justify-between mb-1.5">
              <h5 class="text-sm font-bold text-white flex items-center gap-2">
                <span class="text-base">📍</span>
                <span>Xây Dựng Từ Khóa Địa Điểm Trên Google Maps</span>
              </h5>
              <span class="text-xs font-mono font-bold text-teal-400">Chỉ từ 5.000.000 đ</span>
            </div>
            <p class="text-xs text-slate-300 leading-relaxed">
              Xác minh chính chủ Google Business, tối ưu từ khóa địa phương để phòng khám hiển thị Top 3 khi bệnh nhân tìm kiếm "phòng khám gần đây", tăng lượt ghé trực tiếp.
            </p>
          </div>

          <div class="p-4 rounded-xl bg-slate-900/70 border border-slate-700/60 hover:border-teal-500/40 transition-all">
            <div class="flex items-baseline justify-between mb-1.5">
              <h5 class="text-sm font-bold text-white flex items-center gap-2">
                <span class="text-base">🚀</span>
                <span>Product Management Toàn Diện Cho Phòng Khám</span>
              </h5>
              <span class="text-xs font-mono font-bold text-teal-400">Khoảng 50.000.000 đ</span>
            </div>
            <p class="text-xs text-slate-300 leading-relaxed">
              Định hình và đóng gói dịch vụ điều trị cao cấp (VIP Packages), xây dựng phễu sản phẩm phẫu thuật/điều trị và chuẩn hóa hành trình trải nghiệm người bệnh từ Online tới Offline.
            </p>
          </div>
        </div>

        <!-- Mandatory VAT Note Footer -->
        <div class="p-3 rounded-lg bg-amber-950/30 border border-amber-500/30 text-center">
          <p class="text-[11px] font-semibold text-amber-300">
            * Ghi chú bắt buộc: Tất cả báo giá trên chưa bao gồm thuế GTGT. <u>Xuất hóa đơn VAT + 8%</u> theo quy định hiện hành.
          </p>
        </div>
      </div>
    `
  },

  // ==========================================
  // NODE 01 (Đỉnh DNA): 01. Giới thiệu & Founder
  // ==========================================
  {
    id: 1,
    nodeIndex: 3,
    menuIndex: 0, // Menu [01. Giới thiệu]
    title: "01. Giới Thiệu — Goodlife Media & Founder Đặng Quốc Phong",
    floatingLabel: "01. Giới Thiệu",
    prefixNum: "01.",
    labelTitle: "Giới Thiệu",
    nodeLabel: "01. Giới Thiệu",
    buildingLabel: "01. Giới Thiệu",
    subtitle: "Đơn vị truyền thông & marketing chuyên biệt mảng Y khoa – Chăm sóc sức khỏe tại TP.HCM",
    tagline: "Lõi Pha Lê Trung Tâm • Tầm Nhìn Chiến Lược Y Khoa",
    accentColor: "#38BDF8", // Cyan
    accentHex: 0x38bdf8,
    cameraTarget: { y: 2.5, zoom: 6.2, shiftX: -1.7 },
    content: `
      <div class="space-y-6">
        <!-- Brand Introduction Header -->
        <div class="p-4 rounded-xl bg-sky-950/40 border border-sky-500/25 backdrop-blur-md">
          <p class="text-xs text-sky-200 leading-relaxed">
            <strong>Goodlife Media (TP. Hồ Chí Minh)</strong> là đơn vị truyền thông & marketing chuyên biệt hàng đầu trong lĩnh vực <strong>Y khoa – Chăm sóc sức khỏe</strong>. Chúng tôi phụng sự mục tiêu chuẩn hóa thông tin y tế, giúp các cơ sở y tế và bác sĩ lan tỏa giá trị chữa lành đích thực đến cộng đồng.
          </p>
        </div>

        <!-- 3 Điểm Nhấn Uy Tín (3 Key Trust Pillars) -->
        <div>
          <h4 class="text-xs font-semibold tracking-wider uppercase text-sky-400 mb-2.5">3 Điểm Nhấn Uy Tín Cốt Lõi</h4>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div class="p-3 rounded-xl bg-slate-900/70 border border-sky-500/20 hover:border-sky-400/50 transition-all flex flex-col justify-between">
              <div>
                <div class="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-300 flex items-center justify-center text-xs font-bold mb-2">01</div>
                <h5 class="text-xs font-bold text-white mb-1">Tuân Thủ 100% Quy Chuẩn</h5>
                <p class="text-[11px] text-slate-300 leading-relaxed">Am hiểu sâu sắc Thông tư 09/2015/TT-BYT & Luật Khám chữa bệnh. Nội dung chuẩn mực, nói không với giật tít sai lệch.</p>
              </div>
            </div>

            <div class="p-3 rounded-xl bg-slate-900/70 border border-sky-500/20 hover:border-sky-400/50 transition-all flex flex-col justify-between">
              <div>
                <div class="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center text-xs font-bold mb-2">02</div>
                <h5 class="text-xs font-bold text-white mb-1">MCN Đối Tác TikTok</h5>
                <p class="text-[11px] text-slate-300 leading-relaxed">MCN đối tác chính thức tại Việt Nam. Bảo hộ tài khoản bác sĩ, mở khóa tính năng y tế và hỗ trợ xử lý khiếu nại bản quyền tức thì.</p>
              </div>
            </div>

            <div class="p-3 rounded-xl bg-slate-900/70 border border-sky-500/20 hover:border-sky-400/50 transition-all flex flex-col justify-between">
              <div>
                <div class="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-xs font-bold mb-2">03</div>
                <h5 class="text-xs font-bold text-white mb-1">Tăng Niềm Tin & Chuyển Đổi</h5>
                <p class="text-[11px] text-slate-300 leading-relaxed">Không chạy theo view ảo. Chuyển hóa sự tin cậy chuyên môn thành lượt bệnh nhân thực tế đặt lịch thăm khám điều trị.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Giải Quyết 3 Nỗi Đau Của Phòng Khám & Bác Sĩ -->
        <div>
          <h4 class="text-xs font-semibold tracking-wider uppercase text-sky-400 mb-2.5">Giải Quyết Triệt Để 3 Nỗi Đau Lớn</h4>
          <div class="space-y-2.5">
            <div class="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-rose-500/30 transition-all flex items-start gap-3">
              <div class="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">✕</div>
              <div>
                <h5 class="text-xs font-bold text-white">Nỗi đau 1: Nội dung khô khan khó tiếp cận người bệnh</h5>
                <p class="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                  <span class="text-sky-400 font-semibold">Giải pháp Goodlife:</span> Đội ngũ biên tập y khoa "dịch thuật" thuật ngữ lâm sàng phức tạp thành video ngắn, hình ảnh giải phẫu 3D trực quan, gần gũi và hấp dẫn người xem.
                </p>
              </div>
            </div>

            <div class="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-rose-500/30 transition-all flex items-start gap-3">
              <div class="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">✕</div>
              <div>
                <h5 class="text-xs font-bold text-white">Nỗi đau 2: Rủi ro vi phạm chính sách quảng cáo y tế & mất kênh</h5>
                <p class="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                  <span class="text-sky-400 font-semibold">Giải pháp Goodlife:</span> Tư vấn bộ lọc từ khóa cấm, kiểm duyệt kịch bản 100% trước khi quay và có MCN bảo vệ, xóa bỏ rủi ro bị bóp tương tác hoặc sập kênh.
                </p>
              </div>
            </div>

            <div class="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-rose-500/30 transition-all flex items-start gap-3">
              <div class="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">✕</div>
              <div>
                <h5 class="text-xs font-bold text-white">Nỗi đau 3: Chi phí quảng cáo đắt đỏ nhưng ít bệnh nhân đặt lịch</h5>
                <p class="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                  <span class="text-sky-400 font-semibold">Giải pháp Goodlife:</span> Chiến lược Content Marketing chuẩn y khoa xây dựng lòng tin bền vững, giúp chuyển đổi người theo dõi thành bệnh nhân thực tế với chi phí tối ưu nhất.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Founder Spotlight: Anh Đặng Quốc Phong -->
        <div class="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-sky-950/30 to-slate-900 border border-sky-500/30 shadow-xl relative overflow-hidden">
          <div class="flex items-start gap-4">
            <div class="w-16 h-16 rounded-full bg-gradient-to-tr from-sky-400 to-teal-400 p-0.5 shrink-0 shadow-lg shadow-sky-500/30">
              <div class="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-sky-300 font-bold text-xl font-heading">
                QP
              </div>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h4 class="text-base font-extrabold text-white">Đặng Quốc Phong</h4>
                <span class="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30">Founder & CEO</span>
              </div>
              <p class="text-xs text-sky-400 font-medium mt-0.5">Chuyên Gia Chiến Lược Truyền Thông Y Khoa & Chăm Sóc Sức Khỏe</p>
              <p class="text-xs text-slate-300 leading-relaxed mt-2.5">
                Anh Đặng Quốc Phong là người sáng lập Goodlife Media, chuyên gia tư vấn chiến lược truyền thông hiện đại giúp tối ưu hóa quy trình sản xuất nội dung cho ngành chăm sóc sức khỏe. Với kinh nghiệm đồng hành cùng hàng chục cơ sở y tế, anh trực tiếp cố vấn định vị thương hiệu cho các Bác sĩ chuyên khoa, tháo gỡ rào cản pháp lý và kiến tạo giải pháp truyền thông chân thật, văn minh.
              </p>
            </div>
          </div>

          <!-- Highlighted Blockquote of Founder -->
          <div class="mt-4 pt-4 border-t border-sky-500/20">
            <blockquote class="relative pl-4 border-l-2 border-sky-400 text-xs md:text-sm italic text-sky-100 font-serif leading-relaxed">
              "Làm truyền thông đơn giản lắm. Đó chính là làm cho khách hàng tin tưởng và muốn khách hàng tin tưởng lâu dài chúng ta phải nói sự thật."
            </blockquote>
            <p class="text-right text-[11px] font-semibold text-sky-400 mt-2 font-mono">— Founder Đặng Quốc Phong</p>
          </div>
        </div>
      </div>
    `
  }
];

// Alias for backwards compatibility
const FLOORS_DATA = NODES_DATA;

// Menu index mapping:
// Menu 0: "01. Giới thiệu" -> Node 01 (index 3 in NODES_DATA)
// Menu 1: "02. Dịch vụ & Báo giá" -> Node 02 (index 2 in NODES_DATA)
// Menu 2: "03. Sensory Design" -> Node 03 (index 1 in NODES_DATA)
// Menu 3: "04. FAQ" -> Node 04 (index 0 in NODES_DATA)
const MENU_TO_FLOOR_INDEX = [3, 2, 1, 0];
const MENU_TO_NODE_INDEX = [3, 2, 1, 0];
