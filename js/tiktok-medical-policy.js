/**
 * Goodlife Media - Bộ Tiêu Chuẩn Kiểm Duyệt Nội Dung Y Khoa Trên TikTok
 * Medical Content Policy & Compliance Module (TikTok Healthcare Standard)
 * Version: 3.0.0
 */

const TIKTOK_MEDICAL_POLICY = {
  meta: {
    title: "Bộ Tiêu Chuẩn Kiểm Duyệt Nội Dung Y Khoa Trên TikTok",
    organization: "Goodlife Media — Truyền Thông Y Khoa Chuẩn Chuyên Môn",
    version: "3.0.0",
    lastUpdated: "2026-10-25",
    author: "Founder Đặng Quốc Phong & Ekip Pháp Chế Goodlife Media",
    legalReference: [
      "Luật Khám bệnh, chữa bệnh số 15/2023/QH15",
      "Nghị định 117/2020/NĐ-CP quy định xử phạt vi phạm hành chính trong lĩnh vực y tế",
      "TikTok Community Guidelines — Healthcare & Medical Misinformation Policy"
    ]
  },

  // =========================================================================
  // 1. NHÓM TỪ KHÓA KỊCH BẢN VI PHẠM / NHẠY CẢM TRÊN TIKTOK Y TẾ (TEXT POLICY)
  // =========================================================================
  textPolicy: [
    {
      id: "absolute_commitment",
      groupName: "Nhóm Cam Kết Tuyệt Đối",
      severity: "danger",
      severityLabel: "Nguy hiểm — Cấm tuyệt đối",
      consequence: "Đánh gậy y tế, bóp tương tác vĩnh viễn (Shadowban), khóa tài khoản vì lỗi Medical Misinformation / Cam kết quá đà.",
      keywords: [
        "chữa khỏi 100%",
        "cam kết khỏi bệnh",
        "trị dứt điểm",
        "không tái phát",
        "vĩnh viễn",
        "tuyệt đối an toàn",
        "số 1 việt nam",
        "số một việt nam",
        "duy nhất",
        "thần dược",
        "bí truyền",
        "trị tận gốc"
      ],
      suggestions: [
        "hỗ trợ cải thiện theo phác đồ",
        "phác đồ điều trị phù hợp theo từng thể trạng",
        "giúp kiểm soát triệu chứng hiệu quả",
        "duy trì sự ổn định lâu dài khi tuân thủ hướng dẫn",
        "tùy thuộc vào cơ địa và đáp ứng của mỗi bệnh nhân"
      ]
    },
    {
      id: "commercial_solicitation",
      groupName: "Nhóm Chèo Kéo Thương Mại & Giá Cả Trực Diện",
      severity: "warning",
      severityLabel: "Cảnh báo — Dễ bị quét quảng cáo / Bóp tương tác",
      consequence: "TikTok xem video như nội dung bán hàng chui hoặc điều hướng luồng giao dịch ngoài nền tảng, bóp phân phối tự nhiên (Organic Reach) về 0.",
      keywords: [
        "inbox giá",
        "ib giá",
        "ib ngay",
        "inbox ngay",
        "giảm giá sốc",
        "khuyến mãi khủng",
        "chốt đơn",
        "mua ngay",
        "cam kết hoàn tiền",
        "hoàn tiền 100%",
        "sale sập sàn",
        "giá rẻ nhất"
      ],
      suggestions: [
        "đặt lịch thăm khám trực tiếp cùng bác sĩ",
        "nhận tư vấn chuyên môn từ ekip y tế",
        "tìm hiểu thêm thông tin ở phần mô tả/hồ sơ của bác sĩ",
        "chương trình hỗ trợ tầm soát sức khỏe đặc quyền"
      ]
    },
    {
      id: "sensitive_drugs_procedures",
      groupName: "Nhóm Thuốc & Thủ Thuật Nhạy Cảm",
      severity: "danger",
      severityLabel: "Nguy hiểm — Rủi ro đình chỉ tài khoản",
      consequence: "Vi phạm quy định chất kiểm soát, cấm quảng cáo thuốc kê đơn và hành vi khuyến khích can thiệp thủ thuật y khoa không phép tại nhà.",
      keywords: [
        "thuốc kháng sinh liều cao",
        "tiêm truyền tại nhà",
        "truyền trắng tại nhà",
        "rạch mổ",
        "cắt rạch",
        "máu tươi",
        "bào thai",
        "phá thai",
        "kích dục",
        "tăng kích thước cấp tốc",
        "bột nở ngực",
        "tự nặn mủ",
        "tự tiêm filler"
      ],
      suggestions: [
        "Sử dụng thuật ngữ giải phẫu/dược lý trung tính",
        "Luôn kèm khuyến cáo: 'Tuân thủ chỉ định của bác sĩ chuyên khoa'",
        "Nhắc nhở: 'Chỉ thực hiện can thiệp tại các cơ sở y tế đủ điều kiện cấp phép'",
        "Tuyệt đối không hướng dẫn bệnh nhân tự thực hiện thủ thuật xâm lấn"
      ]
    },
    {
      id: "fear_mongering",
      groupName: "Nhóm Phóng Đại Tâm Lý Sợ Hãi",
      severity: "warning",
      severityLabel: "Cảnh báo — Kích động tâm lý tiêu cực",
      consequence: "Gắn cờ Clickbait giật gân, gieo rắc hoang mang tiêu cực, làm giảm tỷ lệ giữ chân do người dùng bấm 'Không quan tâm' (Not Interested).",
      keywords: [
        "ung thư chết người nếu không biết",
        "hủy hoại gương mặt",
        "mù vĩnh viễn ngay lập tức",
        "chết người nếu không biết",
        "uống cái này là chết",
        "hỏng cả đời",
        "thối mũi",
        "hoại tử ngay lập tức"
      ],
      suggestions: [
        "những dấu hiệu cảnh báo sớm cần lưu ý",
        "tầm soát sức khỏe định kỳ để phát hiện kịp thời",
        "những biến chứng tiềm ẩn khi can thiệp sai kỹ thuật",
        "khi nào người bệnh nên đến cơ sở y tế thăm khám"
      ]
    }
  ],

  // =========================================================================
  // 2. NHÓM LỖI HÌNH ẢNH & VIDEO TRÊN TIKTOK Y TẾ (VISUAL & VIDEO POLICY)
  // =========================================================================
  visualPolicy: [
    {
      id: "blood_open_wounds",
      name: "Lỗi 1: Máu & Vết thương hở (Graphic Blood & Open Wounds)",
      description: "Dấu hiệu máu sinh học thật trên da/mô người, vết thương hở ngoại khoa hoặc rỉ máu mô cơ thể (loại trừ màu đỏ đồ họa, trang phục y tế, logo, chữ viết).",
      riskLevel: "Rất cao",
      algorithmImpact: "Hệ thống AI thị giác (Computer Vision) gắn cờ Graphic/Gory Content, chặn đề xuất For You (FYP) hoặc cảnh báo nhạy cảm.",
      solutions: [
        "Chuyển cảnh quay ngoại khoa sang bộ lọc đơn sắc Đen - Trắng (Black & White).",
        "Hạ độ bão hòa (Desaturation) màu đỏ xuống dưới 20%, chuyển máu sang tone nâu sẫm trung tính.",
        "Áp dụng hiệu ứng làm mờ động (Dynamic Blur / Pixelate) tối thiểu 70% vùng thương tổn.",
        "Thay thế các cảnh mổ xẻ thực tế bằng mô hình 3D y khoa hoặc đồ họa chuyển động giải phẫu (Medical Animation)."
      ]
    },
    {
      id: "sharp_needles_macro",
      name: "Lỗi 2: Kim tiêm & Dụng cụ sắc nhọn cận cảnh (Sharp Objects Macro Shot)",
      description: "Cảnh quay dí sát (Macro) mũi kim tiêm đâm xuyên vào da thịt, dao mổ, kìm nhổ răng gây cảm giác ghê rợn, giật mình cho người xem.",
      riskLevel: "Cao",
      algorithmImpact: "Kích hoạt bộ lọc nội dung bạo lực/gây khó chịu (Shocking & Graphic Content), giảm thời lượng xem trung bình.",
      solutions: [
        "Đặt máy ở góc trung hoặc toàn cảnh (Medium/Wide Shot), lấy nét vào gương mặt và thao tác điềm tĩnh của Bác sĩ.",
        "Cắt cảnh trước khi mũi kim tiếp xúc với bề mặt da (Cut-away shot).",
        "Làm mờ nhẹ khu vực tiếp xúc mũi kim (Focus Blur) hoặc quay góc chéo sau lưng."
      ]
    },
    {
      id: "extreme_before_after",
      name: "Lỗi 3: So sánh Trước/Sau (Before/After) quá đà",
      description: "Ghép ảnh 2 nửa khuôn mặt hoặc cơ thể biến dạng nặng trước và sau điều trị; chỉnh sửa ảnh tạo cảm giác kết quả tức thì kỳ diệu.",
      riskLevel: "Cao",
      algorithmImpact: "Vi phạm trực tiếp chính sách Quảng cáo & Nội dung Y tế Thẩm mỹ của TikTok, bị bóp tương tác hoặc từ chối duyệt bài.",
      solutions: [
        "Trình bày kết quả theo dòng thời gian riêng biệt (Sequential): Khung hình 1 (Trước) -> Khung hình 2 (Sau), không ghép đôi chia đôi màn hình giật gân.",
        "Giữ nguyên điều kiện ánh sáng, góc chụp và tuyệt đối không sử dụng filter làm đẹp sai lệch thực tế.",
        "Luôn ghi rõ mốc thời gian thực tế: 'Kết quả sau 3 - 6 tháng điều trị theo phác đồ'."
      ]
    },
    {
      id: "privacy_sensitive_anatomy",
      name: "Lỗi 4: Lộ bộ phận nhạy cảm & Quyền riêng tư bệnh nhân",
      description: "Quay cận cảnh vùng nhạy cảm không che chắn; hoặc vô tình để lộ hồ sơ bệnh án, căn cước công dân, thẻ BHYT, tên tuổi của bệnh nhân.",
      riskLevel: "Cực kỳ nghiêm trọng (Pháp lý & Thuật toán)",
      algorithmImpact: "TikTok quét vi phạm quyền riêng tư (Privacy Violation) và nội dung khiêu dâm/nhạy cảm (Adult Nudity). Cơ sở y tế đối mặt rủi ro pháp lý theo Nghị định 117.",
      solutions: [
        "100% bệnh nhân xuất hiện đều phải ký văn bản chấp thuận truyền thông y tế (Media Consent Form).",
        "Làm mờ 100% các trường thông tin cá nhân: Họ tên, ngày sinh, số điện thoại, mã số hồ sơ bệnh án.",
        "Sử dụng thanh che đồ họa thương hiệu (Branded Privacy Bars) để che các vùng giải phẫu nhạy cảm."
      ]
    },
    {
      id: "missing_medical_disclaimer",
      name: "Lỗi 5: Thiếu nhãn Miễn trừ trách nhiệm y khoa (Missing Disclaimer)",
      description: "Video chia sẻ kiến thức bệnh lý, phân tích đơn thuốc hoặc hướng dẫn chăm sóc nhưng không có dòng khuyến cáo miễn trừ y khoa.",
      riskLevel: "Trung bình - Cao",
      algorithmImpact: "TikTok ưu tiên gắn cờ cảnh báo người xem, hạn chế mức độ phân phối tin cậy cho tài khoản y tế.",
      standardDisclaimer: "Thông tin mang tính tham khảo chuyên môn. Người bệnh cần thăm khám trực tiếp cùng bác sĩ chuyên khoa để có phác đồ điều trị phù hợp.",
      solutions: [
        "Chèn text cố định kích thước nhỏ ở chân video xuyên suốt toàn bộ thời lượng.",
        "Bác sĩ có thể nói câu kết: 'Mọi thắc mắc cụ thể, hãy đến cơ sở y tế uy tín để được thăm khám trực tiếp'."
      ]
    }
  ],

  // =========================================================================
  // 3. TIỆN ÍCH KIỂM TRA TỰ ĐỘNG KỊCH BẢN (SCRIPT AUDIT HELPER UTILITIES)
  // =========================================================================
  
  /**
   * Quét kịch bản hoặc phụ đề tự động để phát hiện các từ khóa vi phạm
   * @param {string} text - Nội dung kịch bản cần kiểm tra
   * @returns {object} Kết quả phân tích chi tiết, phân loại rủi ro và gợi ý sửa
   */
  checkScript(text) {
    if (!text || typeof text !== 'string') {
      return { isValid: true, violations: [], totalViolations: 0, score: 100 };
    }

    const normalizedText = text.toLowerCase();
    const violations = [];

    this.textPolicy.forEach(group => {
      const matched = [];
      group.keywords.forEach(kw => {
        const regex = new RegExp(`\\b${kw}\\b|${kw}`, 'gi');
        if (regex.test(normalizedText)) {
          matched.push(kw);
        }
      });

      if (matched.length > 0) {
        violations.push({
          groupId: group.id,
          groupName: group.groupName,
          severity: group.severity,
          severityLabel: group.severityLabel,
          matchedKeywords: matched,
          suggestions: group.suggestions,
          consequence: group.consequence
        });
      }
    });

    const hasDanger = violations.some(v => v.severity === 'danger');
    const hasWarning = violations.some(v => v.severity === 'warning');

    let complianceStatus = 'PASS';
    if (hasDanger) complianceStatus = 'CRITICAL_RISK';
    else if (hasWarning) complianceStatus = 'WARNING';

    return {
      isValid: violations.length === 0,
      complianceStatus: complianceStatus,
      totalViolations: violations.reduce((acc, curr) => acc + curr.matchedKeywords.length, 0),
      violations: violations,
      disclaimerRecommendation: this.visualPolicy.find(p => p.id === 'missing_medical_disclaimer').standardDisclaimer
    };
  },

  /**
   * Lấy câu miễn trừ trách nhiệm y tế chuẩn hóa của Goodlife Media
   * @returns {string} Dòng text disclaimer chuẩn chèn vào video
   */
  getStandardDisclaimer() {
    return "Thông tin mang tính tham khảo chuyên môn. Người bệnh cần thăm khám trực tiếp cùng bác sĩ chuyên khoa để có phác đồ điều trị phù hợp.";
  },

  // =========================================================================
  // 4. TIÊU CHUẨN LỌC HÌNH ẢNH: TIẾP GIÁP VÙNG DA & SẮC ĐỘ HEMOGLOBIN
  // (Skin-Adjacent Hemoglobin HSV/YCbCr Filter Specifications)
  // =========================================================================
  visualFilterConfig: {
    // Hemoglobin Red Range: Hue 348°-10°, Sat 0.60-0.88, Val 0.18-0.55
    hemoglobin: {
      hueMin1: 348,
      hueMax1: 360,
      hueMin2: 0,
      hueMax2: 10,
      satMin: 0.60,
      satMax: 0.88,
      valMin: 0.18,
      valMax: 0.55
    },
    // Human Skin YCbCr criteria: 135 <= Cr <= 180, 85 <= Cb <= 135
    skinYCbCr: {
      crMin: 135,
      crMax: 180,
      cbMin: 85,
      cbMax: 135
    },
    // Minimum skin border contact required to suspect blood on human skin (40%)
    minSkinContactRatio: 0.40,
    // Graphic / Garment Red criteria: Saturation > 0.90
    brightRedSaturationThreshold: 0.90,
    // Cluster size boundaries (pixels on 160x110 canvas)
    minClusterSize: 8,
    maxClusterSize: 800,
    // Uniform color & block geometry thresholds
    uniformColorStdDevThreshold: 2.5,
    uniformBoxFillRatioThreshold: 0.85,
    minBoxSizeForFillRatio: 12,
    // Minimum patch size for bright graphic red (Saturation > 0.90)
    minGraphicRedPatchSize: 8,
    // Safe label
    safeRedLabel: "Màu sắc Đồ họa / Trang phục (An toàn)",
    // Gemini Vision System Prompt
    geminiSystemPrompt: `Bạn là hệ thống AI Kiểm duyệt Nội dung Y tế TikTok (TikTok Medical Policy AI Inspector) của Goodlife Media.
Nhiệm vụ: Phân tích khung hình trích xuất từ video y tế để kiểm duyệt vi phạm hình ảnh nhạy cảm theo tiêu chuẩn TikTok Community Guidelines.

TIÊU CHUẨN ĐÁNH GIÁ (TUYỆT ĐỐI TUÂN THỦ):

1. CHỈ BÁO LỖI VI PHẠM ("is_violation": true) KHI:
   - Thấy MÁU SINH HỌC THẬT trên da/mô người (chảy máu, rỉ máu thật từ cơ thể người).
   - VẾT THƯƠNG HỞ (vết rạch mổ ngoại khoa hở, rách da bộc lộ mô thịt, khoang phẫu thuật).
   - KIM TIÊM CẬN CẢNH (ảnh/video dí sát macro mũi kim tiêm nhọn đâm xuyên vào da thịt gây ghê rợn).

2. TUYỆT ĐỐI BỎ QUA VÀ ĐÁNH DẤU AN TOÀN ("is_violation": false) ĐỐI VỚI:
   - Quần áo đỏ, áo blouse/scrubs/váy/đồng phục màu đỏ.
   - Chữ đỏ, tiêu đề video màu đỏ, phụ đề màu đỏ.
   - Logo thương hiệu, icon, sticker màu đỏ.
   - Nội thất màu đỏ, ghế khám đỏ, giường bệnh đỏ, phông nền studio màu đỏ.
   - Son môi đỏ, mỹ phẩm trang điểm, thực phẩm, ánh đèn LED đỏ.
   Khi phát hiện các sắc thái đỏ an toàn này, BẮT BUỘC gắn nhãn "Màu sắc Đồ họa / Trang phục (An toàn)" trong trường "safe_red_note".

TRẢ VỀ ĐỐI TƯỢNG JSON (KHÔNG bọc codeblock markdown):
{
  "is_violation": boolean,
  "violation_type": "blood_open_wounds" | "sharp_needles_macro" | null,
  "confidence": number,
  "safe_red_detected": boolean,
  "safe_red_note": string | null,
  "detected_objects": string[],
  "reason": string,
  "recommendation": string | null
}`
  },

  /**
   * Chuyển đổi RGB sang HSV (H: 0-360, S: 0-1, V: 0-1)
   */
  rgbToHsv(r, g, b) {
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
      h *= 60;
    }
    return { h, s, v };
  },

  /**
   * Chuyển đổi RGB sang YCbCr và kiểm tra màu da người theo chuẩn:
   * YCbCr: 135 <= Cr <= 180, 85 <= Cb <= 135
   */
  isSkinPixel(r, g, b) {
    const cb = 128 - 0.168736 * r - 0.331264 * g + 0.5 * b;
    const cr = 128 + 0.5 * r - 0.418688 * g - 0.081312 * b;
    const cfg = this.visualFilterConfig.skinYCbCr;
    return (cr >= cfg.crMin && cr <= cfg.crMax && cb >= cfg.cbMin && cb <= cfg.cbMax);
  },

  /**
   * Kiểm tra sắc tố đỏ sẫm Hemoglobin:
   * Hue: 348°-10°, Saturation: 0.60-0.88, Value: 0.18-0.55
   */
  isHemoglobinPixel(r, g, b, hsv) {
    const { h, s, v } = hsv || this.rgbToHsv(r, g, b);
    const cfg = this.visualFilterConfig.hemoglobin;
    const isHue = (h >= cfg.hueMin1 && h <= cfg.hueMax1) || (h >= cfg.hueMin2 && h <= cfg.hueMax2);
    const isSat = (s >= cfg.satMin && s <= cfg.satMax);
    const isVal = (v >= cfg.valMin && v <= cfg.valMax);
    return isHue && isSat && isVal;
  },

  /**
   * Kiểm tra mảng màu đỏ tươi đồ họa / trang phục:
   * Đỏ tươi (Saturation > 0.90) hoặc giá trị Value chói
   */
  isBrightGraphicRed(r, g, b, hsv) {
    const { h, s, v } = hsv || this.rgbToHsv(r, g, b);
    const isRedHue = (h >= 340 || h <= 25);
    const isHighSat = s > this.visualFilterConfig.brightRedSaturationThreshold;
    const isBrightV = (v > 0.55 && s > 0.50);
    return isRedHue && (isHighSat || isBrightV);
  },

  /**
   * Lấy System Prompt chuẩn hóa cho Gemini Vision API
   */
  getGeminiSystemPrompt() {
    return this.visualFilterConfig.geminiSystemPrompt;
  }
};

// Hỗ trợ xuất module cho cả môi trường Browser (Window) và Node.js / Module bundlers
if (typeof window !== 'undefined') {
  window.TIKTOK_MEDICAL_POLICY = TIKTOK_MEDICAL_POLICY;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TIKTOK_MEDICAL_POLICY;
}
