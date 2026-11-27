/**
 * Goodlife Media - Bộ Tiêu Chuẩn Kiểm Duyệt Nội Dung Y Khoa & Chính Sách Cộng Đồng TikTok
 * Medical Content Policy & TikTok Community Guidelines Module
 * Version: 4.0.0
 */

const TIKTOK_MEDICAL_POLICY = {
  meta: {
    title: "Bộ Tiêu Chuẩn Kiểm Duyệt Nội Dung Y Khoa & Chính Sách TikTok",
    organization: "Goodlife Media — Truyền Thông Y Khoa Chuẩn Chuyên Môn",
    version: "4.0.0",
    lastUpdated: "2026-11-27",
    author: "Founder Đặng Quốc Phong & Ekip Pháp Chế Goodlife Media",
    legalReference: [
      "Luật Khám bệnh, chữa bệnh số 15/2023/QH15",
      "Nghị định 117/2020/NĐ-CP quy định xử phạt vi phạm hành chính trong lĩnh vực y tế",
      "TikTok Community Guidelines — Tiêu chuẩn Cộng đồng TikTok (8 nhóm quy tắc)",
      "Danh mục Keyword Vi phạm Chính sách Y tế & Social (Yếu tố khẳng định & Yếu tố ngành)"
    ]
  },

  // =========================================================================
  // 1. NHÓM TỪ KHÓA KỊCH BẢN VI PHẠM / NHẠY CẢM (TEXT POLICY)
  // Tổng hợp từ: Quy chuẩn MCN Y tế + Sheet "Keyword vi phạm chính sách" + Slide TikTok Policy
  // =========================================================================
  textPolicy: [
    {
      id: "absolute_commitment",
      groupName: "Nhóm Yếu Tố Khẳng Định & Cam Kết Tuyệt Đối",
      severity: "danger",
      severityLabel: "Nguy hiểm — Cấm khẳng định tuyệt đối",
      consequence: "Đánh gậy y tế, bóp tương tác vĩnh viễn (Shadowban) hoặc khóa tài khoản vì lỗi Medical Misinformation / Quảng cáo cam kết quá đà.",
      keywords: [
        "chữa khỏi 100%",
        "cam kết khỏi bệnh",
        "cải thiện 100%",
        "chỉ sau 1 liệu trình",
        "toàn quốc tin dùng",
        "số 1 việt nam",
        "số một việt nam",
        "tuyệt đối an toàn",
        "hết hoàn toàn",
        "không tái phát",
        "trị dứt điểm",
        "trị tận gốc",
        "có 1 không 2",
        "ngay lập tức",
        "siêu hiệu quả",
        "hoàn toàn",
        "hoàn hảo",
        "vĩnh viễn",
        "tuyệt đối",
        "chắc chắn",
        "chắn chắn",
        "triệt để",
        "bảo đảm",
        "duy nhất",
        "giảm ngay",
        "xóa hết",
        "xoá hết",
        "xóa nám",
        "xoá nám",
        "hết nám",
        "siêu tốt",
        "siêu hay",
        "siêu cao",
        "thần dược",
        "bí truyền",
        "ngăn ngừa",
        "cam kết",
        "rẻ nhất",
        "tức thì",
        "top 1",
        "số 1",
        "100%"
      ],
      suggestions: [
        "hỗ trợ cải thiện theo phác đồ chuyên khoa",
        "phác đồ chăm sóc phù hợp theo từng thể trạng",
        "giúp kiểm soát triệu chứng hiệu quả khi tuân thủ hướng dẫn",
        "duy trì sự ổn định lâu dài tùy thuộc vào cơ địa mỗi người",
        "Tránh các từ khẳng định tuyệt đối (100%, chắc chắn, dứt điểm, vĩnh viễn, số 1)"
      ]
    },
    {
      id: "sensitive_drugs_procedures",
      groupName: "Nhóm Thủ Thuật, Bộ Phận Nhạy Cảm & Yếu Tố Cấm",
      severity: "danger",
      severityLabel: "Nguy hiểm — Rủi ro đình chỉ tài khoản",
      consequence: "Vi phạm quy định chất kiểm soát, thủ thuật xâm lấn tại nhà, nội dung nhạy cảm/gợi dục hoặc kích động hành vi gây hại.",
      keywords: [
        "thuốc kháng sinh liều cao",
        "tăng kích thước cấp tốc",
        "tiêm truyền tại nhà",
        "truyền trắng tại nhà",
        "tự tiêm filler",
        "bột nở ngực",
        "tự nặn mủ",
        "tăng vòng 1",
        "yếu sinh lý",
        "nâng ngực",
        "bơm mông",
        "cắt rạch",
        "máu tươi",
        "rạch mổ",
        "bào thai",
        "phá thai",
        "kích dục",
        "xuất tinh",
        "tình dục",
        "âm đạo",
        "quan hệ",
        "tự tử",
        "ngực",
        "mông",
        "chết"
      ],
      suggestions: [
        "Sử dụng thuật ngữ giải phẫu trung tính (ví dụ: vùng vòng 1, vùng vòng 3, tạo hình thẩm mỹ)",
        "Luôn kèm khuyến cáo: 'Tuân thủ chỉ định của bác sĩ chuyên khoa tại cơ sở y tế đủ điều kiện cấp phép'",
        "Tuyệt đối không hướng dẫn tự tiêm, tự nặn mủ hay can thiệp xâm lấn tại nhà",
        "Tránh trực diện từ ngữ nhạy cảm tình dục, tự sát hoặc tử vong"
      ]
    },
    {
      id: "medical_industry_terms",
      groupName: "Nhóm Yếu Tố Ngành Y Tế & Bệnh Lý (Lưu Ý Policy)",
      severity: "warning",
      severityLabel: "Cảnh báo — Yếu tố ngành (Dễ siết reach / Ads)",
      consequence: "Từ khóa thuộc nhóm Yếu tố ngành (thuốc, điều trị, tăng/giảm cân, bệnh lý, cơ quan nội tạng). Cần diễn đạt mang tính giáo dục y khoa, tránh gắn bán sản phẩm/thuốc trực diện.",
      keywords: [
        "thực phẩm chức năng",
        "phòng khám bệnh",
        "bác sĩ chữa trị",
        "bác sĩ điều trị",
        "thuốc giảm cân",
        "thuốc giảm đau",
        "thuốc trị mụn",
        "thuốc đông y",
        "điều trị da",
        "phẫu thuật",
        "phẩu thuật",
        "khỏi bệnh",
        "bệnh nhân",
        "tăng cân",
        "giảm cân",
        "giảm béo",
        "giảm mỡ",
        "giảm đau",
        "bệnh nhi",
        "ăn kiêng",
        "phun xăm",
        "tức ngực",
        "đau ngực",
        "đau đớn",
        "tuyệt vọng",
        "nam giới",
        "điều trị",
        "trị mụn",
        "béo phì",
        "cắt mí",
        "viêm",
        "tiêm",
        "bệnh",
        "khỏi",
        "trị",
        "hết",
        "mổ",
        "máu",
        "thận",
        "gan",
        "tủy",
        "tuỷ",
        "xương"
      ],
      suggestions: [
        "Với sản phẩm chăm sóc/bôi thoa: thay 'trị mụn, điều trị da' bằng 'chăm sóc da mụn, hỗ trợ phục hồi và làm dịu da'",
        "Thay 'bệnh nhân' bằng 'khách hàng / người thăm khám', thay 'bác sĩ chữa trị' bằng 'bác sĩ đồng hành tư vấn'",
        "Tránh cụm từ có yếu tố 'tăng/giảm' cân nặng hoặc kích thước gắn với cam kết sản phẩm",
        "Luôn đính kèm nhãn Miễn trừ trách nhiệm y khoa khi chia sẻ kiến thức bệnh lý"
      ]
    },
    {
      id: "commercial_solicitation",
      groupName: "Nhóm Thương Mại, Giá Tiền & Điều Hướng Nền Tảng",
      severity: "warning",
      severityLabel: "Cảnh báo — Bóp tương tác / Điều hướng",
      consequence: "TikTok đánh dấu bán hàng chui, đọc giá tiền trực diện hoặc kéo người dùng sang nền tảng khác (Facebook, Zalo, SĐT), làm Organic Reach tụt mạnh.",
      keywords: [
        "cam kết hoàn tiền",
        "hoàn tiền 100%",
        "khuyến mãi khủng",
        "giảm giá sốc",
        "sale sập sàn",
        "số điện thoại",
        "giá rẻ nhất",
        "inbox ngay",
        "inbox giá",
        "chốt đơn",
        "mua ngay",
        "giá tiền",
        "báo giá",
        "link bio",
        "gắn link",
        "facebook",
        "ib ngay",
        "ib giá",
        "zalo",
        "sđt"
      ],
      suggestions: [
        "Không đọc giá tiền sản phẩm/dịch vụ trực diện trong video hoặc bình luận",
        "Không gắn link, SĐT, Zalo dưới bình luận; nếu đặt SĐT ở Bio hồ sơ hãy ghi kèm 'For work'",
        "Khi cần nhắc đến Facebook, hãy dùng tên gọi thay thế (ví dụ: 'Phở bò') để tránh bị quét điều hướng",
        "Chuyển lời kêu gọi sang: 'đặt lịch thăm khám / nhận tư vấn chuyên môn tại hồ sơ của bác sĩ'"
      ]
    },
    {
      id: "fear_mongering",
      groupName: "Nhóm Kích Động Sợ Hãi, Chất Cấm, Vũ Khí & Ngôn Từ Né",
      severity: "warning",
      severityLabel: "Cảnh báo — Từ hạn chế / Tiêu chuẩn cộng đồng",
      consequence: "Gây hoang mang tiêu cực, chứa từ ngữ kích động bạo lực, chất kích thích hoặc từ khóa nhạy cảm bị thuật toán TikTok hạn chế đề xuất.",
      keywords: [
        "ung thư chết người nếu không biết",
        "mù vĩnh viễn ngay lập tức",
        "chết người nếu không biết",
        "hoại tử ngay lập tức",
        "uống cái này là chết",
        "hủy hoại gương mặt",
        "thuốc lá điện tử",
        "hỏng cả đời",
        "bóng cười",
        "nguy hiểm",
        "thối mũi",
        "bị phạt",
        "kẹo ke",
        "shisha",
        "iquat",
        "iqos",
        "vape",
        "pháo",
        "phạt",
        "súng",
        "boom",
        "bom",
        "đốt",
        "phê",
        "fuck"
      ],
      suggestions: [
        "Dùng từ đồng nghĩa an toàn theo TikTok Policy: 'nguy hiểm' → 'không an toàn'; 'đốt' → 'làm nóng chảy'",
        "Thay 'bị phạt' → 'được nhắc nhở / mời lên làm việc'; thay 'phê' → 'tê / thư giãn'",
        "Thay câu giật gân bằng 'những dấu hiệu cảnh báo sớm cần lưu ý' hoặc 'biến chứng tiềm ẩn'",
        "Tuyệt đối tránh từ ngữ liên quan vũ khí (súng, bom, pháo), chất kích thích (shisha, vape, bóng cười) và từ thô tục"
      ]
    }
  ],

  // =========================================================================
  // 2. NHÓM LỖI HÌNH ẢNH, VIDEO & TIÊU CHUẨN CỘNG ĐỒNG (VISUAL & VIDEO POLICY)
  // =========================================================================
  visualPolicy: [
    {
      id: "blood_open_wounds",
      name: "Lỗi 1: Máu & Vết thương hở (Graphic Blood & Open Wounds)",
      description: "Dấu hiệu máu sinh học thật trên da/mô người, vết thương hở ngoại khoa hoặc rỉ máu mô cơ thể (loại trừ màu đỏ đồ họa, trang phục y tế, logo, chữ viết).",
      riskLevel: "Rất cao",
      algorithmImpact: "Hệ thống AI thị giác (Computer Vision) gắn cờ Graphic/Gory Content, chặn đề xuất For You (FYP) hoặc khóa kênh y tế.",
      solutions: [
        "Chuyển cảnh quay ngoại khoa sang bộ lọc đơn sắc Đen - Trắng (Black & White).",
        "Hạ độ bão hòa (Desaturation) màu đỏ xuống dưới 20%, chuyển máu sang tone nâu sẫm trung tính.",
        "Áp dụng hiệu ứng làm mờ động (Dynamic Blur / Pixelate) tối thiểu 70% vùng thương tổn.",
        "Thay thế các cảnh mổ xẻ thực tế bằng mô hình 3D y khoa hoặc đồ họa chuyển động giải phẫu."
      ]
    },
    {
      id: "sharp_needles_macro",
      name: "Lỗi 2: Kim tiêm, Dao mổ & Vật nhọn cận cảnh (Sharp Objects Macro)",
      description: "Cảnh quay dí sát (Macro) mũi kim tiêm đâm xuyên vào da thịt, dao mổ, kìm nhổ răng hoặc vật nhọn gây cảm giác ghê rợn cho người xem.",
      riskLevel: "Cao",
      algorithmImpact: "Kích hoạt bộ lọc nội dung gây khó chịu/bạo lực (Shocking & Graphic Content), rất dễ bị đánh gậy hoặc bay kênh.",
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
        "Trình bày kết quả theo dòng thời gian riêng biệt (Sequential): Khung hình 1 (Trước) -> Khung hình 2 (Sau), không chia đôi màn hình giật gân.",
        "Giữ nguyên điều kiện ánh sáng, góc chụp và tuyệt đối không sử dụng filter làm đẹp sai lệch thực tế.",
        "Luôn ghi rõ mốc thời gian thực tế: 'Kết quả sau 3 - 6 tháng chăm sóc theo phác đồ'."
      ]
    },
    {
      id: "privacy_sensitive_anatomy",
      name: "Lỗi 4: Lộ vùng nhạy cảm, Nội y & Thông tin cá nhân / Giấy tờ",
      description: "Quay vùng nhạy cảm, lộ nội y/dây áo trong, ngồi dạng háng trực diện, trang phục không phù hợp bối cảnh; hoặc lộ CMND/CCCD, hồ sơ bệnh án, địa chỉ nhà, mã QR, tài khoản MXH khác, giấy chứng nhận/giấy cấp phép, tiền mặt thấy rõ chân dung.",
      riskLevel: "Cực kỳ nghiêm trọng (Pháp lý & Thuật toán)",
      algorithmImpact: "TikTok quét vi phạm Quyền riêng tư (Privacy Violation) và nội dung nhạy cảm (Adult Nudity). Cơ sở y tế đối mặt rủi ro pháp lý theo Nghị định 117.",
      solutions: [
        "100% bệnh nhân xuất hiện đều phải ký văn bản chấp thuận truyền thông y tế (Media Consent Form).",
        "Làm mờ 100% thông tin cá nhân: Họ tên, SĐT, địa chỉ nhà, CMND/CCCD, mã QR, tài khoản MXH khác và giấy tờ chứng nhận/cấp phép.",
        "Tránh quay cận cảnh tiền mặt rõ hình chân dung, tránh góc quay nhạy cảm/dạng háng và kiểm tra kỹ trang phục tránh lộ nội y."
      ]
    },
    {
      id: "brand_watermark_copyright",
      name: "Lỗi 5: Logo thương hiệu, Watermark & Bản quyền (Quy tắc ≤ 3s)",
      description: "Gắn logo thương hiệu dạng watermark lên clip, cố tình quay cận cảnh logo trên áo/tường/bảng hiệu, thương hiệu lớn (như chuột Mickey) hoặc quay lại chương trình TV/gameshow có logo đài truyền hình.",
      riskLevel: "Trung bình - Cao",
      algorithmImpact: "AI thị giác quét bản quyền và quảng cáo thương hiệu chưa khai báo. Logo xuất hiện quá 3 giây hoặc quay cận cảnh quảng bá sẽ bị đánh vi phạm.",
      solutions: [
        "Không gắn watermark logo cố định lên video; che mờ logo thương hiệu bên thứ ba trên áo, tường, bảng hiệu.",
        "Nếu lỡ lọt logo thương hiệu vào khung hình, đảm bảo xuất hiện không quá 3 giây và không quay cận cảnh.",
        "Không quay lại màn hình TV, gameshow hoặc sử dụng video có logo đài truyền hình."
      ]
    },
    {
      id: "unsafe_acts_substances_traffic",
      name: "Lỗi 6: Hành vi nguy hiểm, Khói thuốc, Giao thông, Tai nạn & Cảnh gây phản cảm",
      description: "Xuất hiện thuốc lá/shisha/vape/iquat/bóng cười (đặc biệt có làn khói), trẻ em cầm rượu bia, vi phạm giao thông (không đội mũ bảo hiểm, không thắt dây an toàn, bốc đầu), vũ khí/tiếng súng/bom/pháo, cảnh tai nạn hoặc xe móp méo ở background, nằm im quá 2s (nhầm người chết), côn trùng lúc nhúc/giao phối.",
      riskLevel: "Rất cao",
      algorithmImpact: "Kích hoạt kiểm duyệt tự động về Hành vi nguy hiểm (Dangerous Acts), chất kích thích và gây sốc, dẫn đến gỡ video hoặc đánh gậy kênh.",
      solutions: [
        "Kiểm tra kỹ hậu cảnh (background): không để dính xe cộ bị tai nạn móp méo, người vi phạm luật giao thông hoặc công trình thiếu mũ bảo hộ.",
        "Tuyệt đối không để xuất hiện khói thuốc, vape, shisha, bóng cười, vũ khí hoặc âm thanh súng/bom/pháo.",
        "Không diễn cảnh nằm bất động quá 2 giây liên tục và không chèn cảnh côn trùng lúc nhúc/giao phối."
      ]
    },
    {
      id: "video_specs_and_channel_ops",
      name: "Lỗi 7: Tiêu chuẩn Kỹ thuật Video (<3s, Mất tiếng, 9:16, Nhạc >1 phút)",
      description: "Clip có thời lượng dưới 3 giây, bị mất tiếng do lỗi gắn link/quên bật tiếng, khung hình không đầy đủ (viền đen trắng, mờ nhòe) hoặc video trên 1 phút dùng nhạc bản quyền.",
      riskLevel: "Trung bình - Cao",
      algorithmImpact: "TikTok hạn chế phân phối các video dưới 3 giây, mất âm thanh hoặc sai chuẩn hiển thị dọc 9:16; clip > 1 phút dễ bị tắt tiếng vì bản quyền nhạc.",
      solutions: [
        "Đảm bảo thời lượng video tối thiểu từ 3 giây trở lên (lý tưởng 20–90s), quay chuẩn dọc 9:16 đầy màn hình, rõ nét.",
        "Kiểm tra âm thanh trước khi xuất bản; nếu video dài trên 1 phút, sử dụng thư viện nhạc thương mại hoặc nhạc không bản quyền.",
        "Quy tắc quản trị kênh: Không xóa thẳng video đã đăng (nên chuyển sang chế độ Ẩn / Chỉ mình tôi); nếu đặt SĐT ở Bio hãy thêm chữ 'For work'."
      ]
    },
    {
      id: "missing_medical_disclaimer",
      name: "Lỗi 8: Thiếu nhãn Miễn trừ trách nhiệm y khoa (Missing Disclaimer)",
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
  // 2B. CẨM NANG QUY TẮC TIÊU CHUẨN CỘNG ĐỒNG TIKTOK (DÀNH CHO TRA CỨU TRONG MODAL)
  // =========================================================================
  communityChecklist: [
    {
      id: "brand_copyright",
      title: "1. Quy Định Về Thương Hiệu & Bản Quyền",
      badge: "Slide 3",
      items: [
        "Không gắn logo thương hiệu của mình lên clip dưới dạng watermark.",
        "Không quay cận cảnh logo thương hiệu trên áo, tường, bảng hiệu hoặc thương hiệu lớn (ví dụ: hình chuột Mickey).",
        "Không quay lại chương trình truyền hình, gameshow có logo đài truyền hình (vi phạm bản quyền).",
        "Quy tắc 3 giây: Nếu lỡ dính logo thương hiệu vào khung hình, đảm bảo xuất hiện không quá 3 giây để vượt AI — nhưng cố tình quay cận cảnh quảng bá vẫn bị nhân sự kiểm duyệt đánh gậy."
      ]
    },
    {
      id: "profanity_behavior",
      title: "2. Ngôn Ngữ Thô Tục & Hành Vi Không Tốt",
      badge: "Slide 4",
      items: [
        "Không chửi bậy, không đặt tiêu đề khiếm nhã, không dùng từ láy nói lái thô tục, không giơ ngón tay giữa.",
        "Không nhạo báng, xúc phạm, công kích hay đe dọa người khác.",
        "Tránh cảnh cờ bạc, cá cược, hút thuốc; rượu bia chỉ chấp nhận trong ngữ cảnh lễ tiệc, ăn mừng — tuyệt đối cấm trẻ em cầm/uống rượu bia.",
        "Tránh cảnh vi phạm giao thông (không đội mũ bảo hiểm, bốc đầu, không thắt dây an toàn ô tô...) kể cả lọt vào hậu cảnh.",
        "Không sử dụng vũ khí gây sát thương (đặc biệt là súng), kể cả hiệu ứng âm thanh tiếng súng, tiếng bom, tiếng pháo.",
        "Cảnh quay tại công trình đang xây dựng: người đứng dưới bắt buộc đội mũ bảo hộ."
      ]
    },
    {
      id: "specs_privacy",
      title: "3. Tiêu Chuẩn Upload Video & Bảo Mật Thông Tin",
      badge: "Slide 5 & 8",
      items: [
        "Không đăng clip thời lượng dưới 3 giây; kiểm tra tránh clip bị mất tiếng (do lỗi gắn link sản phẩm hoặc quên tắt tiếng).",
        "Quay đúng chuẩn dọc 9:16 đầy màn hình, tránh khung viền đen trắng hoặc hình ảnh mờ nhòe.",
        "Không để lộ: CMND, CCCD, giấy tờ tùy thân, địa chỉ nhà, mã QR, tài khoản mạng xã hội khác.",
        "Không show các loại giấy tờ chứng nhận, giấy cấp phép trực diện trong video clip.",
        "Video clip dưới 1 phút thường tránh được lỗi dính nhạc bản quyền TikTok."
      ]
    },
    {
      id: "dangerous_medical_sensitive",
      title: "4. Hành Vi Nguy Hiểm, Y Khoa & Hình Ảnh Nhạy Cảm",
      badge: "Slide 6 & 7",
      items: [
        "Y khoa: Không để xuất hiện vật nhọn, kim tiêm, dao mổ, máu thật trong video clip (rất dễ bị bay kênh).",
        "Không nằm im bất động quá 2 giây (AI có thể nhận diện nhầm người chết).",
        "Không xuất hiện thuốc lá, shisha, iquat/iqos, bóng cười, kẹo ke, thuốc lá điện tử — đặc biệt tuyệt đối không có làn khói.",
        "Không quay cảnh tai nạn hoặc xe cộ móp méo (kể cả lỡ dính ở background); không quay cận cảnh tiền mặt thấy rõ hình Bác Hồ.",
        "Không quay cảnh côn trùng lúc nhúc, giao phối; tránh thể thao mạo hiểm, tương tác động vật hoang dã, hướng dẫn tự tử.",
        "Không quay cảnh ôm/hôn môi quá 3s, động tác mời gọi tình dục, chạm vùng nhạy cảm (mông, ngực), ngồi dạng háng trực diện, lộ nội y/dây áo trong; trang phục cần đúng bối cảnh (bikini ở hồ bơi/biển, đồ bó sát ở phòng gym)."
      ]
    },
    {
      id: "misinfo_channel_ops",
      title: "5. Tin Sai Sự Thật, Ngôn Từ Né & Quản Trị Kênh",
      badge: "Slide 7 & 8",
      items: [
        "Không đưa thông tin chưa kiểm chứng (dịch bệnh, y tế) hoặc bôi nhọ/đưa hình ảnh cá nhân người khác khi chưa xác thực.",
        "Tránh từ ngữ thẩm mỹ/thuốc cấm: nâng ngực, bơm mông, trị mụn, điều trị da, trị, điều trị...",
        "Thay từ hạn chế bằng từ đồng nghĩa: nguy hiểm → không an toàn; đốt → làm nóng chảy; bị phạt → được nhắc nhở / mời làm việc; phê → tê.",
        "Khi nhắc nền tảng khác dùng tên gọi thay thế (ví dụ: Facebook → Phở bò); không nói hoặc bình luận giá tiền, không gắn link/SĐT/Zalo dưới bình luận.",
        "Quản trị kênh: Không xóa video clip đã đăng (hãy chuyển sang Ẩn); khi thêm SĐT vào Bio hồ sơ nên ghi kèm chữ 'For work'."
      ]
    }
  ],

  // =========================================================================
  // 3. TIỆN ÍCH KIỂM TRA TỰ ĐỘNG KỊCH BẢN (UNICODE-SAFE SCRIPT AUDIT UTILITIES)
  // =========================================================================

  escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  },

  escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  },

  /**
   * Tạo RegExp có biên từ Unicode chuẩn tiếng Việt để tránh bắt nhầm chuỗi con
   * Ví dụ: "trị" không khớp nhầm "giá trị", "gan" không khớp nhầm "thời gian".
   */
  buildKeywordRegex(keyword) {
    const escaped = this.escapeRegex(keyword.trim());
    return new RegExp(`(?<![\\p{L}\\p{N}])${escaped}(?![\\p{L}\\p{N}])`, 'giu');
  },

  /**
   * Quét kịch bản hoặc phụ đề tự động để phát hiện các từ khóa vi phạm
   * Ưu tiên nhóm mức độ nặng (danger) và cụm từ dài hơn để tránh đếm trùng lặp.
   * @param {string} text - Nội dung kịch bản cần kiểm tra
   * @returns {object} Kết quả phân tích chi tiết, phân loại rủi ro và gợi ý sửa
   */
  checkScript(text) {
    if (!text || typeof text !== 'string') {
      return {
        isValid: true,
        complianceStatus: 'PASS',
        violations: [],
        matchedSpans: [],
        totalViolations: 0,
        score: 100,
        disclaimerRecommendation: this.getStandardDisclaimer()
      };
    }

    // Tạo danh sách rule phẳng, ưu tiên severity === 'danger' trước, sau đó theo độ dài từ khóa giảm dần
    const candidates = [];
    this.textPolicy.forEach((group, groupOrder) => {
      group.keywords.forEach(kw => {
        candidates.push({
          group,
          groupOrder,
          keyword: kw,
          priorityRank: group.severity === 'danger' ? 0 : 1
        });
      });
    });

    candidates.sort((a, b) => {
      if (b.keyword.length !== a.keyword.length) return b.keyword.length - a.keyword.length;
      if (a.priorityRank !== b.priorityRank) return a.priorityRank - b.priorityRank;
      return a.groupOrder - b.groupOrder;
    });

    const claimedSpans = [];
    const groupHits = new Map();

    candidates.forEach(({ group, keyword }) => {
      const regex = this.buildKeywordRegex(keyword);
      let match;
      while ((match = regex.exec(text)) !== null) {
        const start = match.index;
        const end = start + match[0].length;
        const overlaps = claimedSpans.some(span => !(end <= span.start || start >= span.end));
        if (!overlaps) {
          claimedSpans.push({
            start,
            end,
            text: match[0],
            keyword,
            groupId: group.id,
            groupName: group.groupName,
            severity: group.severity
          });

          if (!groupHits.has(group.id)) {
            groupHits.set(group.id, {
              groupId: group.id,
              groupName: group.groupName,
              severity: group.severity,
              severityLabel: group.severityLabel,
              matchedKeywords: [],
              matchedCount: 0,
              suggestions: group.suggestions,
              consequence: group.consequence
            });
          }
          const entry = groupHits.get(group.id);
          entry.matchedCount += 1;
          if (!entry.matchedKeywords.includes(keyword)) {
            entry.matchedKeywords.push(keyword);
          }
        }
      }
    });

    // Giữ nguyên thứ tự hiển thị nhóm theo this.textPolicy
    const violations = [];
    this.textPolicy.forEach(group => {
      if (groupHits.has(group.id)) {
        violations.push(groupHits.get(group.id));
      }
    });

    claimedSpans.sort((a, b) => a.start - b.start);

    const hasDanger = violations.some(v => v.severity === 'danger');
    const hasWarning = violations.some(v => v.severity === 'warning');

    let complianceStatus = 'PASS';
    if (hasDanger) complianceStatus = 'CRITICAL_RISK';
    else if (hasWarning) complianceStatus = 'WARNING';

    return {
      isValid: violations.length === 0,
      complianceStatus: complianceStatus,
      totalViolations: claimedSpans.length,
      violations: violations,
      matchedSpans: claimedSpans,
      disclaimerRecommendation: this.getStandardDisclaimer()
    };
  },

  /**
   * Bôi màu an toàn các đoạn vi phạm trên văn bản gốc (không làm hỏng thẻ HTML)
   * @param {string} text - Văn bản gốc
   * @param {Array} matchedSpans - Danh sách span đã phát hiện từ checkScript
   * @returns {string} Chuỗi HTML an toàn đã gắn thẻ <mark>
   */
  highlightText(text, matchedSpans) {
    if (!text) return '';
    if (!matchedSpans || matchedSpans.length === 0) {
      return this.escapeHtml(text).replace(/\n/g, '<br>');
    }

    const sorted = [...matchedSpans].sort((a, b) => a.start - b.start);
    let cursor = 0;
    let html = '';

    sorted.forEach(span => {
      if (span.start < cursor) return;
      html += this.escapeHtml(text.slice(cursor, span.start));
      const badgeClass = span.severity === 'danger' ? 'script-highlight-danger' : 'script-highlight-warning';
      const titleAttr = this.escapeHtml(`${span.groupName}: ${span.text}`);
      html += `<mark class="${badgeClass}" title="${titleAttr}">${this.escapeHtml(text.slice(span.start, span.end))}</mark>`;
      cursor = span.end;
    });

    html += this.escapeHtml(text.slice(cursor));
    return html.replace(/\n/g, '<br>');
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
    // Gemini Vision System Prompt (Cập nhật đầy đủ tiêu chuẩn TikTok Policy & Y tế)
    geminiSystemPrompt: `Bạn là hệ thống AI Kiểm duyệt Nội dung Y tế & Chính sách Cộng đồng TikTok (TikTok Policy & Medical AI Inspector) của Goodlife Media.
Nhiệm vụ: Phân tích khung hình trích xuất từ video/ảnh để kiểm duyệt vi phạm theo tiêu chuẩn TikTok Community Guidelines & Y tế.

TIÊU CHUẨN ĐÁNH GIÁ (TUYỆT ĐỐI TUÂN THỦ):

1. CHỈ BÁO LỖI VI PHẠM ("is_violation": true) KHI PHÁT HIỆN MỘT TRONG CÁC LỖI SAU:
   - "blood_open_wounds": MÁU SINH HỌC THẬT trên da/mô người (chảy máu, rỉ máu thật) hoặc VẾT THƯƠNG HỞ (vết rạch mổ ngoại khoa hở, rách da bộc lộ mô thịt, khoang phẫu thuật).
   - "sharp_needles_macro": KIM TIÊM / DAO MỔ CẬN CẢNH (dí sát macro mũi kim tiêm nhọn hoặc dao mổ đâm vào da thịt).
   - "privacy_or_documents": Lộ CMND/CCCD, giấy tờ tùy thân, mã QR, địa chỉ nhà, số điện thoại/Zalo/tài khoản MXH khác, giấy tờ chứng nhận/cấp phép, hoặc quay cận cảnh tiền mặt thấy rõ chân dung.
   - "brand_watermark": Logo thương hiệu gắn dạng watermark lớn hoặc quay cận cảnh logo thương hiệu / logo đài truyền hình bản quyền.
   - "restricted_visual_policy": Lộ nội y/vùng nhạy cảm/hành vi gợi dục; khói thuốc lá/vape/shisha/bóng cười; trẻ em cầm rượu bia; cảnh vi phạm giao thông hoặc tai nạn xe móp méo; vũ khí (súng); côn trùng lúc nhúc/giao phối; hoặc chữ chèn trong khung hình chứa từ cấm khẳng định tuyệt đối (100%, chữa khỏi, cam kết, dứt điểm, số 1).

2. TUYỆT ĐỐI BỎ QUA VÀ ĐÁNH DẤU AN TOÀN ("is_violation": false) ĐỐI VỚI:
   - Quần áo đỏ, áo blouse/scrubs/váy/đồng phục màu đỏ.
   - Chữ đỏ, tiêu đề video màu đỏ, phụ đề màu đỏ (nếu nội dung chữ an toàn).
   - Thiết kế đồ họa, icon, sticker màu đỏ không phải logo thương hiệu vi phạm bản quyền.
   - Nội thất màu đỏ, ghế khám đỏ, giường bệnh đỏ, phông nền studio màu đỏ.
   - Son môi đỏ, mỹ phẩm trang điểm, thực phẩm, ánh đèn LED đỏ.
   Khi phát hiện các sắc thái đỏ an toàn này, BẮT BUỘC gắn nhãn "Màu sắc Đồ họa / Trang phục (An toàn)" trong trường "safe_red_note".

TRẢ VỀ ĐỐI TƯỢNG JSON (KHÔNG bọc codeblock markdown):
{
  "is_violation": boolean,
  "violation_type": "blood_open_wounds" | "sharp_needles_macro" | "privacy_or_documents" | "brand_watermark" | "restricted_visual_policy" | null,
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
