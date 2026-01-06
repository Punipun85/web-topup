import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Packages() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    api.get("/admin/packages")
      .then(res => setPackages(res.data.data));
  }, []);

  const updatePrice = (id, price) => {
    api.put(`/admin/packages/${id}`, { price });
  };

  const removePromo = (id) => {
    api.delete(`/admin/packages/${id}/promo`)
      .then(() => {
        setPackages(p =>
          p.map(x => x.id === id ? { ...x, promo: null } : x)
        );
      });
  };

  return (
    <>
      <h1>Packages</h1>

      <table>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Harga</th>
            <th>Promo</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {packages.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>
                <input
                  defaultValue={p.price}
                  onBlur={e => updatePrice(p.id, e.target.value)}
                />
              </td>
              <td>{p.promo ? "Aktif" : "-"}</td>
              <td>
                {p.promo && (
                  <button
                    className="danger"
                    onClick={() => removePromo(p.id)}
                  >
                    Hapus Promo
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
