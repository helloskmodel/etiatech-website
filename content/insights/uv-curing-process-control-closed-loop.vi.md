---
title: "Vì sao sấy UV cần kiểm soát quy trình: phản hồi vòng kín và chương trình chiếu"
description: "Quang thông của nguồn sáng trôi theo thời gian và nhiệt độ, không người vận hành nào đảm bảo được liều đồng đều từng chi tiết. Kiểm soát quy trình giải quyết bằng ba lớp."
date: 2026-09-15
tags: [Process Control, Closed-Loop Feedback, Traceability]
author: ETIA Technology
cover: https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/insight%20/09-closed-loop-feedback-vs-no-feedback-lamp-output.png
---

**Câu trả lời một dòng:** Quang thông của nguồn sáng trôi theo thời gian và nhiệt độ, không người vận hành nào đảm bảo được liều đồng đều từng chi tiết; kiểm soát quy trình giải quyết bằng ba lớp — ổn định nguồn sáng (phản hồi vòng kín, giám sát nhiệt độ), chương trình hóa việc chiếu (StepCure nhiều bước, kích hoạt PLC) và truy xuất (nhật ký, phân quyền, quản lý từ xa). Đây là nền tảng của sự đồng nhất giữa các lô và tuân thủ kiểm toán trong sản xuất y tế, quang học, ô tô.

## Vì sao nguồn sáng trôi

- Đèn thủy ngân suy giảm theo giờ dùng; không bù thì cường độ cuối đời có thể giảm vài chục phần trăm.
- LED giảm quang thông khi nhiệt độ chip tăng và suy giảm chậm theo tuổi thọ.
- Đường quang: ống dẫn sáng lão hóa, thấu kính bẩn.

![So sánh phản hồi vòng kín: không có phản hồi, cường độ đèn thủy ngân giảm liên tục trong 2.000 giờ; có phản hồi vòng kín, cường độ giữ ổn định](https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/insight%20/09-closed-loop-feedback-vs-no-feedback-lamp-output.png)

*Phản hồi vòng kín của OmniCure S2000 Elite dùng cảm biến bên trong tự động điều chỉnh màn chắn để giữ giá trị đặt trong ±5%. Nguồn ảnh: Tài liệu OmniCure S2000 Elite.*

## Ba lớp kiểm soát

### 1. Ổn định nguồn sáng

- Phản hồi vòng kín: cảm biến quang bên trong giám sát thời gian thực và điều chỉnh màn chắn để giữ giá trị đặt trong ±5%; khi đèn không còn đạt giá trị đặt sẽ báo động, dùng đèn tới hết tuổi thọ mà không cần kiểm tra thủ công thường xuyên.
- Giám sát nhiệt độ và tuổi thọ: điều chỉnh tham số theo nhiệt độ đèn, ghi giờ, chống khởi động nóng; giám sát nhiệt độ đầu LED giữ ±5% trong lúc chiếu.
- Cửa chớp tốc độ cao (30 ms): liều chính xác cho chiếu ngắn.

### 2. Chương trình hóa việc chiếu

- Hồ sơ nhiều bước như 75% × 1,5 s cố định sơ bộ → 100% × 5 s sấy hoàn toàn → 50% × 2 s sấy bổ sung, giảm ứng suất co ngót và khóa vị trí căn chỉnh.
- Kích hoạt bằng PLC, bàn đạp hoặc USB; chương trình lưu thẻ SD, sao chép giữa các máy.

### 3. Truy xuất

- Nhật ký sự kiện (flight recorder), ghi dữ liệu thời gian thực.
- Thẻ NFC phân quyền theo cấp, ngăn người vận hành đổi tham số.
- Web UI chạy từ xa, tải nhật ký, cập nhật firmware hàng loạt.

## Cái giá của việc không kiểm soát quy trình

Suy hao chèn dao động giữa các lô (module quang), lực dán không đồng đều (thiết bị y tế), bề mặt in dính — hầu hết "sự cố keo" truy ngược đều là liều bị trôi.

## Sản phẩm liên quan

[OmniCure S2000 Elite](/product/omnicure/s2000): phản hồi vòng kín ±5%, cửa chớp 30 ms, StepCure 2.0, 7 ngõ ra PLC, Web UI, flight recorder, thẻ NFC. [OmniCure LX500](/product/systems/lx500): Intelli-Lamp LED ±5%, StepCure 2.0, ghi Micro SD, PLC/USB. [Phoseon UV LED làm mát bằng gió](/product/phoseon): hộp điều khiển bật/tắt và điều chỉnh cường độ tuyến tính.

## Câu hỏi thường gặp

**Q: Hệ đèn thủy ngân không có phản hồi vòng kín thì sao?**

A: Đo định kỳ bằng máy đo bức xạ, chỉnh cường độ thủ công và ghi chép, hoặc nâng cấp lên dòng có vòng kín.

**Q: Làm sao giữ nhiều máy đồng nhất?**

A: Cùng máy đo bức xạ hiệu chuẩn, cùng chương trình StepCure, cùng phiên bản firmware.
