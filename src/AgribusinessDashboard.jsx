import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer
} from "recharts";

const exportData = [
  { year: "2018", soy: 33.2, corn: 8.1, sugarcane: 5.4, cattle: 7.2, coffee: 5.8, cotton: 2.1 },
  { year: "2019", soy: 35.8, corn: 9.2, sugarcane: 5.1, cattle: 8.0, coffee: 5.5, cotton: 2.4 },
  { year: "2020", soy: 38.5, corn: 10.4, sugarcane: 5.9, cattle: 9.1, coffee: 6.2, cotton: 2.8 },
  { year: "2021", soy: 43.1, corn: 12.2, sugarcane: 6.1, cattle: 10.5, coffee: 7.1, cotton: 3.2 },
  { year: "2022", soy: 47.8, corn: 14.8, sugarcane: 6.8, cattle: 12.3, coffee: 7.8, cotton: 3.9 },
  { year: "2023", soy: 51.2, corn: 16.1, sugarcane: 7.2, cattle: 13.8, coffee: 8.4, cotton: 4.5 },
  { year: "2024", soy: 54.6, corn: 17.9, sugarcane: 7.8, cattle: 15.2, coffee: 9.1, cotton: 5.0 },
];

const regionData = [
  { region: "Mato Grosso", production: 38.4, share: 28 },
  { region: "Paraná", production: 21.2, share: 15 },
  { region: "Rio Grande do Sul", production: 18.9, share: 14 },
  { region: "Mato Grosso do Sul", production: 15.6, share: 11 },
  { region: "Goiás", production: 14.3, share: 10 },
  { region: "Other States", production: 30.6, share: 22 },
];

const techAdoptionData = [
  { year: "2019", precision: 22, iot: 14, ai: 8, drones: 18 },
  { year: "2020", precision: 28, iot: 19, ai: 12, drones: 25 },
  { year: "2021", precision: 35, iot: 27, ai: 18, drones: 33 },
  { year: "2022", precision: 44, iot: 36, ai: 27, drones: 42 },
  { year: "2023", precision: 55, iot: 48, ai: 38, drones: 54 },
  { year: "2024", precision: 67, iot: 61, ai: 52, drones: 65 },
];

const globalShareData = [
  { name: "Brazil", value: 28, color: "#4a7c59" },
  { name: "USA", value: 22, color: "#c8a96e" },
  { name: "Argentina", value: 14, color: "#8b5e3c" },
  { name: "EU", value: 13, color: "#6b8f71" },
  { name: "China", value: 11, color: "#d4956a" },
  { name: "Others", value: 12, color: "#a8b5a2" },
];

const kpis = [
  { label: "Brazil Agri GDP", value: "$124.8B", change: "+8.3%", icon: "🌱" },
  { label: "Global Soy Share", value: "28%", change: "+2.1%", icon: "🫘" },
  { label: "Hectares Farmed", value: "80.4M ha", change: "+3.7%", icon: "🗺️" },
  { label: "Export Revenue", value: "$166.3B", change: "+11.2%", icon: "📦" },
];

const COLORS = ["#4a7c59", "#c8a96e", "#8b5e3c", "#6b8f71", "#d4956a", "#a8b5a2"];

const sectors = ["soy", "corn", "sugarcane", "cattle", "coffee", "cotton"];
const sectorColors = {
  soy: "#4a7c59", corn: "#c8a96e", sugarcane: "#6b8f71",
  cattle: "#8b5e3c", coffee: "#5c3d2e", cotton: "#a8b5a2"
};

export default function AgribusinessDashboard() {
  const [activeSectors, setActiveSectors] = useState(["soy", "corn", "cattle"]);
  const [activeTab, setActiveTab] = useState("exports");

  const toggleSector = (s) =>
    setActiveSectors((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: "#1c2818", border: "1px solid #4a7c59", borderRadius: 8,
          padding: "10px 14px", fontSize: 12, color: "#e8dfc8"
        }}>
          <p style={{ fontWeight: 700, marginBottom: 4, color: "#c8a96e" }}>{label}</p>
          {payload.map((p) => (
            <p key={p.dataKey} style={{ color: p.color, margin: "2px 0" }}>
              {p.dataKey}: <strong>{typeof p.value === "number" ? (p.value > 20 ? `$${p.value}B` : `${p.value}%`) : p.value}</strong>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#111a0e", color: "#e8dfc8",
      fontFamily: "'Georgia', serif", padding: "0",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1c2818 0%, #243020 60%, #1a2515 100%)",
        borderBottom: "1px solid #2e4528", padding: "32px 40px 24px",
        position: "relative", overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", top: 0, right: 0, width: 400, height: 200,
          background: "radial-gradient(ellipse at top right, rgba(200,169,110,0.08) 0%, transparent 70%)"
        }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 4, color: "#c8a96e", textTransform: "uppercase", marginBottom: 8 }}>
              Global Agriculture Intelligence
            </div>
            <h1 style={{
              margin: 0, fontSize: "clamp(22px, 4vw, 38px)", fontWeight: 400,
              color: "#e8dfc8", letterSpacing: -1, lineHeight: 1.1
            }}>
              Brazil Agribusiness<br />
              <span style={{ color: "#c8a96e", fontStyle: "italic" }}>Industry Dashboard</span>
            </h1>
            <p style={{ margin: "10px 0 0", color: "#8a9e82", fontSize: 13, maxWidth: 480 }}>
              Tracking export performance, regional output, and digital transformation across Brazil's agricultural sectors · 2018–2024
            </p>
          </div>
          <div style={{
            background: "rgba(74,124,89,0.15)", border: "1px solid #2e4528",
            borderRadius: 8, padding: "8px 16px", fontSize: 12, color: "#8a9e82"
          }}>
            <span style={{ color: "#c8a96e", fontWeight: 700 }}>2024</span> · Live Data View
          </div>
        </div>
      </div>

      <div style={{ padding: "28px 40px", maxWidth: 1400 }}>
        {/* KPI Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
          {kpis.map((k) => (
            <div key={k.label} style={{
              background: "#1c2818", border: "1px solid #2e4528", borderRadius: 12,
              padding: "20px 22px", position: "relative", overflow: "hidden"
            }}>
              <div style={{
                position: "absolute", top: -10, right: -10, fontSize: 52, opacity: 0.07
              }}>{k.icon}</div>
              <div style={{ fontSize: 11, color: "#8a9e82", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>{k.label}</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#e8dfc8", fontFamily: "monospace" }}>{k.value}</div>
              <div style={{ fontSize: 12, color: "#4a7c59", marginTop: 4, fontWeight: 600 }}>↑ {k.change} YoY</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 24, borderBottom: "1px solid #2e4528", paddingBottom: 0 }}>
          {[
            { id: "exports", label: "Export Trends" },
            { id: "regions", label: "Regional Output" },
            { id: "tech", label: "Tech Adoption" },
            { id: "global", label: "Global Share" },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              background: activeTab === tab.id ? "#4a7c59" : "transparent",
              border: "none", color: activeTab === tab.id ? "#e8dfc8" : "#8a9e82",
              padding: "10px 20px", borderRadius: "8px 8px 0 0", cursor: "pointer",
              fontSize: 13, fontFamily: "Georgia, serif", transition: "all 0.2s",
              borderBottom: activeTab === tab.id ? "2px solid #c8a96e" : "2px solid transparent"
            }}>{tab.label}</button>
          ))}
        </div>

        {/* Export Trends */}
        {activeTab === "exports" && (
          <div style={{ background: "#1c2818", border: "1px solid #2e4528", borderRadius: 14, padding: "24px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
              <div>
                <h2 style={{ margin: 0, fontSize: 18, fontWeight: 400, color: "#e8dfc8" }}>Export Revenue by Sector</h2>
                <p style={{ margin: "4px 0 0", fontSize: 12, color: "#8a9e82" }}>USD Billions · Toggle sectors below</p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {sectors.map((s) => (
                  <button key={s} onClick={() => toggleSector(s)} style={{
                    background: activeSectors.includes(s) ? sectorColors[s] : "transparent",
                    border: `1px solid ${sectorColors[s]}`, borderRadius: 20,
                    color: activeSectors.includes(s) ? "#fff" : sectorColors[s],
                    padding: "4px 14px", fontSize: 11, cursor: "pointer",
                    textTransform: "capitalize", fontFamily: "Georgia, serif", transition: "all 0.15s"
                  }}>{s}</button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={exportData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  {sectors.map((s) => (
                    <linearGradient key={s} id={`grad-${s}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={sectorColors[s]} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={sectorColors[s]} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2e4528" />
                <XAxis dataKey="year" stroke="#8a9e82" tick={{ fontSize: 12 }} />
                <YAxis stroke="#8a9e82" tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v}B`} />
                <Tooltip content={<CustomTooltip />} />
                {sectors.filter((s) => activeSectors.includes(s)).map((s) => (
                  <Area key={s} type="monotone" dataKey={s} stroke={sectorColors[s]}
                    fill={`url(#grad-${s})`} strokeWidth={2} dot={false} />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Regional Output */}
        {activeTab === "regions" && (
          <div style={{ background: "#1c2818", border: "1px solid #2e4528", borderRadius: 14, padding: "24px 20px" }}>
            <h2 style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 400, color: "#e8dfc8" }}>Production by State (Million Tonnes)</h2>
            <p style={{ margin: "0 0 20px", fontSize: 12, color: "#8a9e82" }}>Agricultural output distribution across Brazil's key farming states</p>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={regionData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2e4528" horizontal={false} />
                <XAxis type="number" stroke="#8a9e82" tick={{ fontSize: 12 }} tickFormatter={(v) => `${v}M`} />
                <YAxis type="category" dataKey="region" stroke="#8a9e82" tick={{ fontSize: 12 }} width={140} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="production" radius={[0, 6, 6, 0]}>
                  {regionData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 20 }}>
              {regionData.map((r, i) => (
                <div key={r.region} style={{
                  background: "#243020", borderRadius: 8, padding: "8px 14px",
                  border: `1px solid ${COLORS[i % COLORS.length]}40`, fontSize: 12
                }}>
                  <span style={{ color: COLORS[i % COLORS.length], fontWeight: 700 }}>{r.share}%</span>
                  <span style={{ color: "#8a9e82", marginLeft: 6 }}>{r.region}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Adoption */}
        {activeTab === "tech" && (
          <div style={{ background: "#1c2818", border: "1px solid #2e4528", borderRadius: 14, padding: "24px 20px" }}>
            <h2 style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 400, color: "#e8dfc8" }}>Digital Technology Adoption Rate</h2>
            <p style={{ margin: "0 0 20px", fontSize: 12, color: "#8a9e82" }}>% of farms adopting tech solutions — Precision Ag, IoT, AI Analytics, Drones</p>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={techAdoptionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2e4528" />
                <XAxis dataKey="year" stroke="#8a9e82" tick={{ fontSize: 12 }} />
                <YAxis stroke="#8a9e82" tick={{ fontSize: 12 }} tickFormatter={(v) => `${v}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12, color: "#8a9e82" }} />
                <Line type="monotone" dataKey="precision" name="Precision Ag" stroke="#4a7c59" strokeWidth={2.5} dot={{ r: 4, fill: "#4a7c59" }} />
                <Line type="monotone" dataKey="iot" name="IoT Sensors" stroke="#c8a96e" strokeWidth={2.5} dot={{ r: 4, fill: "#c8a96e" }} />
                <Line type="monotone" dataKey="ai" name="AI Analytics" stroke="#d4956a" strokeWidth={2.5} dot={{ r: 4, fill: "#d4956a" }} />
                <Line type="monotone" dataKey="drones" name="Drones" stroke="#8a9e82" strokeWidth={2.5} dot={{ r: 4, fill: "#8a9e82" }} />
              </LineChart>
            </ResponsiveContainer>
            <div style={{
              marginTop: 20, background: "#243020", borderRadius: 10, padding: "14px 18px",
              border: "1px solid #2e4528", fontSize: 13, color: "#8a9e82", lineHeight: 1.6
            }}>
              💡 <strong style={{ color: "#c8a96e" }}>Key Insight:</strong> AI analytics adoption grew from 8% to 52% between 2019–2024, driven by government AgTech incentives and Brazilian startup investment in precision agriculture platforms.
            </div>
          </div>
        )}

        {/* Global Share */}
        {activeTab === "global" && (
          <div style={{ background: "#1c2818", border: "1px solid #2e4528", borderRadius: 14, padding: "24px 20px" }}>
            <h2 style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 400, color: "#e8dfc8" }}>Global Soy Export Market Share</h2>
            <p style={{ margin: "0 0 20px", fontSize: 12, color: "#8a9e82" }}>Brazil's dominant position in the global soybean market · 2024</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 32, alignItems: "center", justifyContent: "center" }}>
              <ResponsiveContainer width={300} height={300}>
                <PieChart>
                  <Pie data={globalShareData} cx="50%" cy="50%" outerRadius={120}
                    innerRadius={65} dataKey="value" paddingAngle={3}>
                    {globalShareData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: "#1c2818", border: "1px solid #4a7c59", borderRadius: 8, color: "#e8dfc8" }} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 200 }}>
                {globalShareData.map((d, i) => (
                  <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 12, height: 12, borderRadius: 3, background: COLORS[i], flexShrink: 0 }} />
                    <span style={{ color: "#8a9e82", fontSize: 13, flex: 1 }}>{d.name}</span>
                    <span style={{ color: "#e8dfc8", fontFamily: "monospace", fontWeight: 700, fontSize: 15 }}>{d.value}%</span>
                  </div>
                ))}
                <div style={{
                  marginTop: 12, background: "#243020", borderRadius: 8,
                  padding: "12px 14px", border: "1px solid #4a7c5940", fontSize: 12, color: "#8a9e82"
                }}>
                  Brazil holds the <strong style={{ color: "#c8a96e" }}>#1 position</strong> globally, surpassing the U.S. since 2012 and continuing to grow its market lead.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: 32, borderTop: "1px solid #2e4528", paddingTop: 16, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <span style={{ fontSize: 11, color: "#4a5e42" }}>Data sourced from USDA, CONAB, MAPA Brazil · 2018–2024</span>
          <span style={{ fontSize: 11, color: "#4a5e42" }}>Agribusiness in Brazil — Industry Analysis Project · University of Houston</span>
        </div>
      </div>
    </div>
  );
}