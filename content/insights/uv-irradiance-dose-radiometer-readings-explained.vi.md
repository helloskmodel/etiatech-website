---
title: "Cường độ bức xạ, liều chiếu và vì sao hai máy đo cho số khác nhau: đo UV để kiểm soát quy trình"
description: "Bốn biến số định nghĩa một lần chiếu UV, máy đo bức xạ thực sự đo gì, dải UVA2 cho LED, một công thức quy đổi liều theo tốc độ dây chuyền, và cách giữ số đọc so sánh được giữa các trạm."
date: 2026-09-09
tags: [Radiometry, UV Measurement, Process Validation, OmniCure R2000, LS200]
cover: https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/product/LS200.png
coverFit: contain
author: ETIA Technology
---

Mọi bản thông số quy trình UV đều có một con số — 2 W/cm², 1,5 J/cm², "đóng rắn hoàn toàn ở 60 mm/s". Con số chỉ hữu ích nếu tất cả những người đọc nó đo theo cùng một cách, và trong đóng rắn UV điều đó thường không xảy ra. Hai máy đo bức xạ đã hiệu chuẩn chĩa vào cùng một đèn có thể cho số đọc chênh 30%, và cả hai đều đúng. Bài viết này đặt ra bộ từ vựng, giải thích sự chênh lệch đến từ đâu, và đưa ra các phương pháp làm việc giúp phép đo UV thực sự phục vụ thiết kế và kiểm soát quy trình — nội dung từ tài liệu kỹ thuật của Excelitas Noblelight về đo đèn áp suất trung bình và UV LED, áp dụng cho các hệ thống ETIA cung cấp.

## Bốn biến số định nghĩa một lần chiếu

Một lần chiếu UV được mô tả đầy đủ bởi bốn thứ:

- **Cường độ bức xạ (irradiance)** — công suất bức xạ đến bề mặt trên một đơn vị diện tích, trong một dải bước sóng xác định: W/cm² hoặc mW/cm². Đây là đại lượng tức thời, như "độ sáng" của ánh sáng tại chi tiết.
- **Thời gian** — bề mặt được chiếu bao lâu. Trên băng tải, thời gian do tốc độ dây chuyền và chiều dài vùng chiếu quyết định.
- **Phân bố phổ** — công suất đó trải ra thế nào theo bước sóng. Đèn thủy ngân trải từ 250 đến 600 nm; LED dồn gần như toàn bộ trong 10–20 nm quanh bước sóng trung tâm.
- **Nhiệt độ** — mức tăng nhiệt của nền trong lúc chiếu, làm thay đổi động học đóng rắn.

**Liều (dose)** (đúng ra là *exposure* hay *mật độ năng lượng*) là tích phân của cường độ theo thời gian: J/cm² hoặc mJ/cm². Liều là thứ hóa học phản ứng với; cường độ là thứ thiết bị cung cấp. Một quy trình có thể đạt cùng liều bằng cường độ cao trong thời gian ngắn hoặc cường độ thấp trong thời gian dài, và kết quả không phải lúc nào cũng giống nhau — cường độ đỉnh cao đẩy đóng rắn sâu hơn vào lớp dày hoặc có màu so với cùng liều đó cấp chậm.

## Các thiết bị đo gì

**Máy đo bức xạ (radiometer)** cảm nhận cường độ trên đầu dò trong dải mà kính lọc cho qua, và hầu hết máy hiện đại tích phân theo thời gian để báo cả liều. **Máy đo phơi sáng** tích lũy năng lượng trực tiếp. **Máy đo phổ bức xạ** thêm bộ đơn sắc và báo cường độ theo từng bước sóng, độ phân giải đến nửa nanomet — công cụ để kiểm tra đèn thực sự phát gì. **Phim đổi màu bức xạ** đổi màu theo tổng năng lượng và có thể đặt trực tiếp lên chi tiết.

Với đèn áp suất trung bình, cường độ tại chi tiết được phân loại hữu ích thành rất thấp (1–100 mW/cm²), thấp (100 mW/cm² đến 1 W/cm²), cao (1–10 W/cm²) hoặc rất cao (trên 10 W/cm²). Các hệ đóng rắn điểm như OmniCure S2000 Elite và LX500 nằm ở nhóm cuối tại đầu dẫn sáng — hàng chục W/cm² — đó là lý do liều của chúng được cấp trong vài giây.

## Vì sao hai máy đo không khớp

Máy đo bức xạ khác nhau ở ba điểm: dải bước sóng kính lọc cho qua (độ đáp ứng), góc ánh sáng chúng nhận, và kích thước cùng tấm khuếch tán của khẩu độ. Hai thiết bị đo cùng một đèn báo số khác nhau vì chúng tích phân những lát phổ khác nhau trên góc nhận khác nhau. Không cái nào sai; chúng trả lời những câu hỏi khác nhau.

Hệ quả cho nhà máy rất đơn giản: **một con số UV chỉ có ý nghĩa khi đi kèm thiết bị đã tạo ra nó.** Chuẩn hóa một loại máy đo cho mỗi quy trình, hiệu chuẩn theo chu kỳ cố định, và ghi model máy cùng mọi số đọc. Một thông số ghi "1,2 W/cm²" mà không nêu tên máy thì không thể tái lập ở trạm khác.

## LED cần dải riêng

Máy đo chế tạo cho đèn thủy ngân có đường đáp ứng định hình quanh các dải UVA, UVB và UVC. Chĩa vào LED 395 nm chúng có phản ứng, nhưng không phải phản ứng đã hiệu chuẩn, và các máy khác nhau còn lệch nhau nhiều hơn khi đo đèn. Nhóm Đo lường của RadTech Bắc Mỹ vì thế đề xuất một dải riêng, **UVA2 (365–405 nm)**, cho nguồn LED, và các máy đo LED hữu dụng được hiệu chuẩn theo dải này — chẳng hạn OmniCure LS200 cho đầu LED LX500, trong khi R2000 hiệu chuẩn cho đèn S-Series.

Cách RadTech khuyến nghị mô tả một nguồn LED là ba con số: cường độ đỉnh tĩnh tại tâm ở khoảng cách nêu rõ (thường 10 mm), kích thước mặt phát, và bước sóng trung tâm — ví dụ *15 W/cm² – 44 mm – 395 nm*. Một dòng đó nói cho kỹ sư tiếp theo mọi điều mà nhãn "đèn UV LED" bỏ sót.

## Khoảng cách không phải chú thích

Đèn áp suất trung bình trong gương phản xạ elip hội tụ ánh sáng: cường độ cao nhất cách đèn vài centimet, tại đường tiêu. Mảng LED ngược lại — cường độ cao nhất tại cửa sổ và giảm liên tục theo khoảng cách, giảm dốc hơn với nguồn phát nhỏ. "Nghịch đảo bình phương" là hướng dẫn thô, không phải quy luật.

Vậy khoảng cách làm việc thuộc về thông số, và phép đo phải thực hiện ở khoảng cách đó — từ cửa sổ LED đến tấm khuếch tán của máy đo. Với đầu đóng rắn điểm có thấu kính hội tụ, điều tương tự áp dụng cho chiều cao tiêu: LS200 đi kèm đồ gá định vị chùm tia chính vì lý do này, để cảm biến nằm đúng chỗ chi tiết sẽ nằm.

## Đo một lần, mọi tốc độ

Trên băng tải, đo liều ở mọi tốc độ dây chuyền ứng viên là không cần thiết. Liều tỷ lệ nghịch với tốc độ, và trên đồ thị log-log liều theo tốc độ là một đường thẳng. Đo một lần ở tốc độ mà số đọc tin cậy nhất — gọi liều là E₀ ở tốc độ v₀ — và tính liều ở bất kỳ tốc độ nào khác:

**Eₓ = E₀ · v₀ / vₓ**

Xác định liều tối thiểu cho đóng rắn hoàn toàn trên bàn thí nghiệm, áp dụng công thức, và tốc độ dây chuyền tối đa theo sau. Cộng biên an toàn vào liều, không phải vào tốc độ, là thói quen thận trọng.

## Đối chiếu phim với máy đo

Nơi máy đo không thể vào được về mặt vật lý — dưới mảng LED cách cửa sổ vài milimet, bên trong đồ gá vòng đóng rắn quanh ống thông — phim đổi màu bức xạ vào được. Phương pháp là đặt phim lên chính máy đo, chiếu cả hai cùng lúc, và đối chiếu thay đổi mật độ quang của phim với số đọc của máy cho nguồn đó. Đường đối chiếu là riêng cho từng đèn hoặc LED, nhưng một khi đã có, chỉ cần phim là dùng được trên chi tiết.

## Một quy trình đo đứng vững trước kiểm toán

1. Một model máy đo cho mỗi loại nguồn: dải LED (UVA2) cho đầu LED, dải đèn cho đèn hồ quang.
2. Hiệu chuẩn theo chu kỳ cố định (LS200 là một năm, truy xuất được đến NRC), chứng chỉ lưu hồ sơ.
3. Đo ở khoảng cách làm việc hoặc chiều cao tiêu thật, dùng đồ gá định vị.
4. Ghi cường độ, liều, khoảng cách, bước sóng, model máy và ngày cho mọi trạm.
5. Đo lại theo lịch — hàng tuần hoặc hàng tháng — và vẽ xu hướng, để thấu kính bẩn hoặc đèn lão hóa lộ ra trước khi chi tiết gặp vấn đề.

Với hệ đèn S-Series, ETIA cung cấp OmniCure R2000 kèm bộ chuyển đổi dẫn sáng và đầu dò Cure-Site, Cure-Ring, để số đọc lấy tại mối dán chứ không phải tại đèn. Với đầu LED LX500, ETIA cung cấp bộ hiệu chuẩn LS200 và máy đo LM2011. Cả hai đều được hiệu chuẩn và tái chứng nhận qua ETIA — thường là phần của quy trình mà nhà máy khó tự duy trì nhất.

*Nguồn: Excelitas Noblelight Knowledge Corner, "UV Measurements of Medium-Pressure Lamps and UV-LEDs for Process Design and Control"; Nhóm Đo lường RadTech Bắc Mỹ; thông số kỹ thuật OmniCure R2000 và LS200.*
