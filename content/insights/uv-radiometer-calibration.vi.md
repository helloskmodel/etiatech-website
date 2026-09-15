---
title: "Máy đo bức xạ UV là gì? Vì sao quy trình sấy phải hiệu chuẩn"
description: "Máy đo bức xạ UV là cách duy nhất biến giá trị danh định của thiết bị thành giá trị quy trình thực tế. Nguồn thủy ngân và LED cần máy đo hiệu chuẩn khác nhau, đo tại đúng vị trí sấy."
date: 2026-09-15
tags: [Radiometer, Calibration, Process Control]
author: ETIA Technology
cover: https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/insight%20/10-uv-led-beam-positioning-radiometer-calibration.png
coverFit: contain
---

**Câu trả lời một dòng:** Máy đo bức xạ UV (radiometer) đo cường độ (W/cm²) hoặc công suất quang (W) tại vị trí sấy, là cách duy nhất biến "giá trị danh định của thiết bị" thành "giá trị quy trình thực tế". Nguồn thủy ngân và LED cần máy đo hiệu chuẩn khác nhau; phép đo phải thực hiện tại đúng vị trí sấy, đúng chiều cao tiêu điểm, chùm sáng căn thẳng vào đầu dò và truy nguyên tới chuẩn quốc gia như NIST.

## Vì sao không tin được giá trị danh định

- Cường độ giảm theo khoảng cách; giá trị danh định ứng với thấu kính và khoảng cách cụ thể.
- Mọi phụ kiện quang (ống dẫn sáng, vòng sấy, khớp góc) đều có tổn hao; đầu ra vòng sấy thấp hơn đầu ống dẫn sáng.
- Nguồn sáng suy giảm theo thời gian.

## Đo đèn thủy ngân và LED

| Hạng mục | Đèn thủy ngân | LED |
|---|---|---|
| Phổ | Rộng, cần đầu dò dải rộng | Đơn sắc, hiệu chuẩn theo bước sóng |
| Chùm sáng | Mặt ống dẫn sáng tương đối lớn | Chùm hẹp, phải vào tâm đầu dò ở đúng chiều cao tiêu điểm |
| Đo đặc biệt | Đầu dò vòng sấy và đầu dò vị trí sấy đo trực tiếp tại mối dán | Bộ định vị chùm sáng đảm bảo căn chỉnh lặp lại |
| Thiết bị Excelitas | OmniCure R2000 (truy nguyên NIST) | OmniCure LS200 / LS200P (±10%, truy nguyên NIST/NRC, chu kỳ hiệu chuẩn 1 năm) |

![Hiệu chuẩn UV LED trong thực tế: đầu LED gắn trên đồ gá định vị chùm sáng, căn thẳng vào đầu dò máy đo bức xạ để đo chính xác cường độ đỉnh](https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/insight%20/10-uv-led-beam-positioning-radiometer-calibration.png)

*Chùm LED hẹp phải vào tâm đầu dò ở đúng chiều cao tiêu điểm; bộ định vị chùm sáng giúp phép đo lặp lại. Nguồn ảnh: Tài liệu OmniCure LX500.*

![Máy đo bức xạ OmniCure R2000 với đầu dò vị trí sấy và đầu dò vòng sấy, đo cường độ trực tiếp tại mối dán hoặc đầu ra vòng sấy](https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/insight%20/10b-r2000-radiometer-cure-site-cure-ring-detector.png)

*Mỗi điểm nối trên đường quang đều tổn hao năng lượng; hãy đo tại đúng vị trí sấy. Nguồn ảnh: Catalog sản phẩm OmniCure.*

## Quy trình hiệu chuẩn khuyến nghị

1. Đo giá trị chuẩn sau lắp đặt, ghi thấu kính, khoảng cách và cường độ đặt.
2. Kiểm tra mỗi ca hoặc mỗi lô; lệch quá ±10% thì điều chỉnh.
3. Đo lại sau khi thay ống dẫn sáng hoặc thấu kính.
4. So sánh chéo nhiều máy bằng cùng một máy đo.
5. Gửi máy đo hiệu chuẩn đúng chu kỳ (LS200: 1 năm).

## Sản phẩm liên quan

[OmniCure S2000 Elite](/product/omnicure/s2000) với [R2000](/product/systems/r2000) hiển thị cường độ thời gian thực và là hệ sấy điểm đèn thủy ngân duy nhất hiệu chuẩn thời gian thực theo NIST. [OmniCure LX500](/product/systems/lx500) có máy đo tích hợp, hiệu chuẩn tại chỗ với [LS200](/product/systems/ls200) và bộ định vị chùm sáng. [Hệ sợi quang làm mát gió Phoseon](/product/phoseon) có sẵn vị trí lắp trong FRU để giám sát cường độ.

## Câu hỏi thường gặp

**Q: Dùng máy đo đèn thủy ngân đo LED được không?**

A: Không; đáp ứng phổ khác nhau, số đọc vô nghĩa. LED cần đầu dò hiệu chuẩn tại 365/385/395/405 nm.

**Q: Có phải đo cả cường độ lẫn liều?**

A: Máy đo đo cường độ; liều tính từ cường độ × thời gian chiếu (hoặc tốc độ dây chuyền). Cả hai đều phải ghi vào tài liệu quy trình.
