export type LocalizedCoreKey = 'home' | 'codes' | 'tier-list' | 'units' | 'guides';

type SupportedLocale = 'pt-br' | 'th' | 'vi' | 'id';

type CoreCopy = {
  title: string;
  description: string;
  steps: string[];
  dataHeading: string;
  dataIntro: string;
  tierCta: string;
  guidesCta: string;
};

const localized: Record<SupportedLocale, Record<LocalizedCoreKey, CoreCopy>> = {
  'pt-br': {
    home: {
      title: 'Wiki de Universal Tower Defense Z',
      description: 'Comece o Update 4 resgatando códigos, identificando a função que falta no time e escolhendo apenas uma rota de evento ou evolução para investir.',
      steps: ['Resgate os códigos com a pontuação exata.', 'Compare carry, controle, chefe e economia.', 'Confirme evolução, trait e relic no jogo antes de gastar.'],
      dataHeading: 'Prioridades atuais do Update 4',
      dataIntro: 'Use os atalhos abaixo para transformar recompensas em progresso real.',
      tierCta: 'Abrir tier list', guidesCta: 'Abrir guias'
    },
    codes: {
      title: 'Códigos de Universal Tower Defense Z',
      description: 'Copie os códigos ativos do Update 4 antes de invocar ou rerrolar. Mantenha maiúsculas, números e sinais exatamente como aparecem.',
      steps: ['Entre no jogo oficial.', 'Abra o menu de códigos e cole um por vez.', 'Troque de servidor se um código novo falhar.'],
      dataHeading: 'Códigos ativos e recompensas', dataIntro: 'A data de verificação acompanha cada código; a interface ao vivo decide a validade final.',
      tierCta: 'Planejar unidades', guidesCta: 'Ver guia do Update 4'
    },
    'tier-list': {
      title: 'Tier list de Universal Tower Defense Z',
      description: 'Compare o elenco antigo com Yhwach, Ichigo, Gremmy, Yamamoto, Asura, Rukia e Yoruichi sem inventar DPS ainda não verificado.',
      steps: ['Comece pelo problema do modo.', 'Cheque forma, evolução, trait e relic.', 'Mantenha unidades novas na lista de teste até haver dados estáveis.'],
      dataHeading: 'Unidades atuais em observação', dataIntro: 'As funções são mais seguras que um ranking baseado apenas em hype.',
      tierCta: 'Ver unidades', guidesCta: 'Abrir guias'
    },
    units: {
      title: 'Unidades de Universal Tower Defense Z',
      description: 'Organize unidades por carry, chefe, controle, suporte e economia. Uma unidade nova só substitui a antiga quando melhora uma rota medida.',
      steps: ['Escolha a função que falta.', 'Conclua a rota de obtenção e evolução.', 'Teste antes de usar rerolls premium.'],
      dataHeading: 'Watchlist de unidades do Update 4', dataIntro: 'Os nomes ficam iguais aos do jogo para facilitar a busca.',
      tierCta: 'Abrir tier list', guidesCta: 'Ver como obter'
    },
    guides: {
      title: 'Guias de Universal Tower Defense Z',
      description: 'Use guias focados para Update 4, eventos, novas unidades, synchros, traits, relics e composição de time.',
      steps: ['Leia o guia geral do Update 4.', 'Escolha o guia do sistema que bloqueia a conta.', 'Volte à tier list antes de gastar.'],
      dataHeading: 'Guias prioritários', dataIntro: 'Cada guia responde uma decisão específica, sem duplicar páginas vazias.',
      tierCta: 'Abrir tier list', guidesCta: 'Ver códigos'
    }
  },
  th: {
    home: { title: 'วิกิ Universal Tower Defense Z', description: 'เริ่ม Update 4 ด้วยการใช้โค้ด ตรวจบทบาทที่ทีมขาด และเลือกเส้นทางกิจกรรมหรือวิวัฒนาการเพียงหนึ่งทางก่อนลงทุน', steps: ['ใช้โค้ดโดยคงตัวพิมพ์และเครื่องหมาย', 'เทียบตัวแบก ควบคุม บอส และเศรษฐกิจ', 'ตรวจวิวัฒนาการ trait และ relic ในเกม'], dataHeading: 'ลำดับความสำคัญ Update 4', dataIntro: 'ใช้ทางลัดเพื่อเปลี่ยนรางวัลเป็นความก้าวหน้า', tierCta: 'เปิด tier list', guidesCta: 'เปิดคู่มือ' },
    codes: { title: 'โค้ด Universal Tower Defense Z', description: 'ใช้โค้ด Update 4 ก่อนสุ่มหรือ reroll และคัดลอกเครื่องหมายทุกตัวให้ถูกต้อง', steps: ['เข้าเกม Roblox ทางการ', 'ใส่โค้ดทีละรายการ', 'เปลี่ยนเซิร์ฟเวอร์หากโค้ดใหม่ใช้ไม่ได้'], dataHeading: 'โค้ดและรางวัลที่ใช้งานได้', dataIntro: 'เกมเป็นแหล่งตัดสินสถานะสุดท้าย', tierCta: 'วางแผนยูนิต', guidesCta: 'ดูคู่มือ Update 4' },
    'tier-list': { title: 'Tier list Universal Tower Defense Z', description: 'เปรียบเทียบยูนิตเดิมกับ Yhwach, Ichigo, Gremmy, Yamamoto, Asura, Rukia และ Yoruichi โดยไม่เดาค่า DPS', steps: ['เริ่มจากปัญหาของโหมด', 'ตรวจร่าง วิวัฒนาการ trait และ relic', 'เก็บยูนิตใหม่ไว้ใน watchlist จนข้อมูลนิ่ง'], dataHeading: 'ยูนิต Update 4 ที่กำลังตรวจสอบ', dataIntro: 'บทบาทน่าเชื่อถือกว่าการจัดอันดับตามกระแส', tierCta: 'ดูยูนิต', guidesCta: 'เปิดคู่มือ' },
    units: { title: 'ยูนิต Universal Tower Defense Z', description: 'จัดทีมด้วยตัวแบก บอส ควบคุม ซัพพอร์ต และเศรษฐกิจ ยูนิตใหม่ควรแทนตัวเก่าเมื่อแก้ปัญหาได้จริง', steps: ['เลือกบทบาทที่ขาด', 'ทำเส้นทางรับและวิวัฒนาการให้เสร็จ', 'ทดสอบก่อนใช้ reroll หายาก'], dataHeading: 'Watchlist ยูนิต Update 4', dataIntro: 'ชื่อยูนิตใช้ตามเกมเพื่อค้นหาได้ตรงกัน', tierCta: 'เปิด tier list', guidesCta: 'ดูวิธีรับ' },
    guides: { title: 'คู่มือ Universal Tower Defense Z', description: 'คู่มือสำหรับ Update 4 กิจกรรม ยูนิตใหม่ synchro trait relic และทีม', steps: ['เริ่มจากภาพรวม Update 4', 'เลือกคู่มือของระบบที่ติดอยู่', 'กลับมาตรวจ tier list ก่อนใช้ทรัพยากร'], dataHeading: 'คู่มือสำคัญ', dataIntro: 'แต่ละหน้าตอบการตัดสินใจหนึ่งเรื่อง', tierCta: 'เปิด tier list', guidesCta: 'ดูโค้ด' }
  },
  vi: {
    home: { title: 'Universal Tower Defense Z Wiki', description: 'Bắt đầu Update 4 bằng code, xác định vai trò đội còn thiếu và chỉ đầu tư một tuyến sự kiện hoặc tiến hóa.', steps: ['Nhập code đúng ký tự.', 'So sánh carry, boss, control và economy.', 'Kiểm tra evolution, trait và relic trong game.'], dataHeading: 'Ưu tiên Update 4', dataIntro: 'Dùng các lối tắt để biến phần thưởng thành tiến độ.', tierCta: 'Mở tier list', guidesCta: 'Mở hướng dẫn' },
    codes: { title: 'Code Universal Tower Defense Z', description: 'Nhập code Update 4 trước khi summon hoặc reroll và giữ nguyên dấu câu.', steps: ['Mở game Roblox chính thức.', 'Nhập từng code.', 'Đổi server nếu code mới chưa hoạt động.'], dataHeading: 'Code đang hoạt động', dataIntro: 'Trạng thái cuối cùng luôn do giao diện game xác nhận.', tierCta: 'Lập kế hoạch unit', guidesCta: 'Xem Update 4' },
    'tier-list': { title: 'Tier list Universal Tower Defense Z', description: 'So sánh roster cũ với Yhwach, Ichigo, Gremmy, Yamamoto, Asura, Rukia và Yoruichi mà không đoán DPS.', steps: ['Bắt đầu từ vấn đề của mode.', 'Kiểm tra form, evolution, trait và relic.', 'Giữ unit mới ở watchlist đến khi có dữ liệu ổn định.'], dataHeading: 'Unit Update 4 cần kiểm tra', dataIntro: 'Vai trò đáng tin hơn xếp hạng theo độ hiếm.', tierCta: 'Xem unit', guidesCta: 'Mở hướng dẫn' },
    units: { title: 'Unit Universal Tower Defense Z', description: 'Sắp xếp unit theo carry, boss, control, support và economy. Chỉ thay unit cũ khi unit mới cải thiện một nội dung cụ thể.', steps: ['Chọn vai trò còn thiếu.', 'Hoàn thành tuyến obtain và evolution.', 'Thử nghiệm trước khi dùng reroll hiếm.'], dataHeading: 'Watchlist unit Update 4', dataIntro: 'Tên unit giữ nguyên như trong game.', tierCta: 'Mở tier list', guidesCta: 'Xem cách lấy' },
    guides: { title: 'Hướng dẫn Universal Tower Defense Z', description: 'Hướng dẫn Update 4, event, unit mới, synchro, trait, relic và đội hình.', steps: ['Đọc tổng quan Update 4.', 'Chọn hướng dẫn cho hệ thống đang chặn tiến độ.', 'Kiểm tra tier list trước khi tiêu tài nguyên.'], dataHeading: 'Hướng dẫn ưu tiên', dataIntro: 'Mỗi trang giải quyết một quyết định rõ ràng.', tierCta: 'Mở tier list', guidesCta: 'Xem code' }
  },
  id: {
    home: { title: 'Universal Tower Defense Z Wiki', description: 'Mulai Update 4 dengan code, cari peran tim yang kurang, lalu pilih satu rute event atau evolusi untuk investasi.', steps: ['Masukkan code dengan tanda yang tepat.', 'Bandingkan carry, boss, control, dan economy.', 'Cek evolusi, trait, dan relic di game.'], dataHeading: 'Prioritas Update 4', dataIntro: 'Gunakan pintasan untuk mengubah reward menjadi progres.', tierCta: 'Buka tier list', guidesCta: 'Buka panduan' },
    codes: { title: 'Code Universal Tower Defense Z', description: 'Gunakan code Update 4 sebelum summon atau reroll dan salin tanda baca persis.', steps: ['Buka game Roblox resmi.', 'Masukkan satu code setiap kali.', 'Ganti server jika code baru gagal.'], dataHeading: 'Code aktif dan reward', dataIntro: 'Status akhir harus dikonfirmasi oleh game.', tierCta: 'Rencanakan unit', guidesCta: 'Lihat Update 4' },
    'tier-list': { title: 'Tier list Universal Tower Defense Z', description: 'Bandingkan roster lama dengan Yhwach, Ichigo, Gremmy, Yamamoto, Asura, Rukia, dan Yoruichi tanpa menebak DPS.', steps: ['Mulai dari masalah mode.', 'Cek form, evolusi, trait, dan relic.', 'Simpan unit baru di watchlist sampai datanya stabil.'], dataHeading: 'Unit Update 4 yang dipantau', dataIntro: 'Peran lebih aman daripada ranking berdasarkan hype.', tierCta: 'Lihat unit', guidesCta: 'Buka panduan' },
    units: { title: 'Unit Universal Tower Defense Z', description: 'Susun unit sebagai carry, boss, control, support, dan economy. Unit baru menggantikan unit lama hanya jika hasilnya terukur.', steps: ['Pilih peran yang kurang.', 'Selesaikan rute obtain dan evolusi.', 'Tes sebelum memakai reroll langka.'], dataHeading: 'Watchlist unit Update 4', dataIntro: 'Nama unit mengikuti game agar mudah dicari.', tierCta: 'Buka tier list', guidesCta: 'Lihat cara mendapat' },
    guides: { title: 'Panduan Universal Tower Defense Z', description: 'Panduan Update 4, event, unit baru, synchro, trait, relic, dan tim.', steps: ['Mulai dari overview Update 4.', 'Pilih panduan untuk sistem yang menghambat.', 'Cek tier list sebelum belanja.'], dataHeading: 'Panduan prioritas', dataIntro: 'Setiap halaman menjawab satu keputusan.', tierCta: 'Buka tier list', guidesCta: 'Lihat code' }
  }
};

export function getLocalizedCoreCopy(locale: string, key: LocalizedCoreKey) {
  if (locale in localized) return localized[locale as SupportedLocale][key];
  return undefined;
}
