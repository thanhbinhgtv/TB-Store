export function Footer() {
  return (
    <footer
      id="footer"
      className="mt-8 border-t border-(--border-default) bg-(--surface-subtle) text-(--text-primary)"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <h3 className="text-lg font-bold">TB</h3>
          <p className="mt-3 text-sm text-(--text-secondary)">
            Chuyên hải sản tươi sống, giao nhanh trong ngày
          </p>
          <p className="mt-2 text-sm text-(--text-secondary)">Địa chỉ: Chợ Đạo Tú - Tam Dương - Vĩnh Phúc</p>
          <p className="mt-2 text-sm text-(--text-secondary)">Email: cskh@tbseafood.vn</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-(--text-accent)">Hỗ trợ khách hàng</h4>
          <ul className="mt-3 space-y-2 text-sm text-(--text-secondary)">
            <li>Hướng dẫn đặt hàng</li>
            <li>Phương thức thanh toán</li>
            <li>Quy định giao hàng</li>
            <li>Chính sách đổi trả</li>
          </ul>
        </div>

        <div className="rounded-xl bg-(--surface-accent) p-4">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-(--text-accent)">Đặt hàng nhanh</h4>
          <p className="mt-3 text-sm text-(--text-secondary)">Tư vấn chọn hải sản theo nhu cầu gia đình và nhà hàng.</p>
          <p className="mt-3 text-2xl font-bold text-(--text-primary)">0912 345 678</p>
          <p className="mt-1 text-xs text-(--text-secondary)">08:00 - 21:00 (Thứ 2 - Chủ nhật)</p>
        </div>
      </div>

      <div className="border-t border-(--border-default)">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-(--text-muted) sm:px-6 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 TB-Store</p>
          <p>SĐT: 0912 345 678</p>
        </div>
      </div>
    </footer>
  );
}
