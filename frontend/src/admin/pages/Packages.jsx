import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [gameFilter, setGameFilter] = useState("all");

  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = async () => {
    const res = await api.get("/admin/packages");
    setPackages(res.data.data);
  };

  const updateField = (id, updater) => {
    setPackages(prev =>
      prev.map(p =>
        p.id === id ? updater(p) : p
      )
    );
  };

  const save = async (pkg) => {
    try {
      setSaving(true);

      await api.put(`/admin/packages/${pkg.id}`, {
        price: Number(pkg.price),
        promo_enabled: pkg.promo_enabled,
        promo_price: pkg.meta?.promo?.price || null,
        promo_starts_at: pkg.meta?.promo?.starts_at || null,
        promo_ends_at: pkg.meta?.promo?.ends_at || null,
      });

      setEditingId(null);
      alert("Paket berhasil disimpan");
      loadPackages();
    } catch  {
      alert("Gagal menyimpan paket");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!confirm("Yakin hapus paket ini?")) return;
    await api.delete(`/admin/packages/${id}`);
    setPackages(prev => prev.filter(p => p.id !== id));
  };

  // daftar game unik untuk filter
  const games = [
    ...new Map(
      packages
        .filter(p => p.game)
        .map(p => [p.game.id, p.game])
    ).values()
  ];

  return (
    <>
      <h1>Packages</h1>

      {/* FILTER GAME */}
      <div style={{ marginBottom: 16 }}>
        <select
          value={gameFilter}
          onChange={e => setGameFilter(e.target.value)}
        >
          <option value="all">Semua Game</option>
          {games.map(g => (
            <option key={g.id} value={g.id}>
              {g.code} - {g.name}
            </option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Game</th>
            <th>Paket</th>
            <th>Harga</th>
            <th>Promo</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {packages
            .filter(p =>
              gameFilter === "all"
                ? true
                : String(p.game?.id) === gameFilter
            )
            .map(p => {
              const isEdit = editingId === p.id;

              return (
                <tr key={p.id}>
                  <td>{p.game?.code}</td>
                  <td>{p.name}</td>

                  {/* HARGA */}
                  <td>
                    {isEdit ? (
                      <input
                        type="number"
                        value={p.price}
                        onChange={e =>
                          updateField(p.id, old => ({
                            ...old,
                            price: e.target.value
                          }))
                        }
                      />
                    ) : (
                      `Rp ${Number(p.price).toLocaleString("id-ID")}`
                    )}
                  </td>

                  {/* PROMO */}
                  <td>
                    <label>
                      <input
                        type="checkbox"
                        checked={!!p.promo_enabled}
                        disabled={!isEdit}
                        onChange={e =>
                          updateField(p.id, old => ({
                            ...old,
                            promo_enabled: e.target.checked
                          }))
                        }
                      />
                      Aktif
                    </label>

                    {isEdit && p.promo_enabled && (
                      <div style={{ marginTop: 8 }}>
                        <input
                          type="number"
                          placeholder="Harga Promo"
                          value={p.meta?.promo?.price || ""}
                          onChange={e =>
                            updateField(p.id, old => ({
                              ...old,
                              meta: {
                                ...old.meta,
                                promo: {
                                  ...(old.meta?.promo || {}),
                                  price: e.target.value
                                }
                              }
                            }))
                          }
                        />

                        <input
                          type="date"
                          value={p.meta?.promo?.starts_at || ""}
                          onChange={e =>
                            updateField(p.id, old => ({
                              ...old,
                              meta: {
                                ...old.meta,
                                promo: {
                                  ...(old.meta?.promo || {}),
                                  starts_at: e.target.value
                                }
                              }
                            }))
                          }
                        />

                        <input
                          type="date"
                          value={p.meta?.promo?.ends_at || ""}
                          onChange={e =>
                            updateField(p.id, old => ({
                              ...old,
                              meta: {
                                ...old.meta,
                                promo: {
                                  ...(old.meta?.promo || {}),
                                  ends_at: e.target.value
                                }
                              }
                            }))
                          }
                        />
                      </div>
                    )}
                  </td>

                  {/* AKSI */}
                  <td>
                    {isEdit ? (
                      <>
                        <button
                          onClick={() => save(p)}
                          disabled={saving}
                        >
                          Simpan
                        </button>
                        <button onClick={() => setEditingId(null)}>
                          Batal
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => setEditingId(p.id)}>
                          Edit
                        </button>
                        <button
                          className="danger"
                          onClick={() => remove(p.id)}
                        >
                          Hapus
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}
