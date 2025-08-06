// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { FiUser, FiMail, FiCreditCard, FiHash, FiAward, FiShield, FiPhone, FiTrendingUp } from "react-icons/fi";
// import { auth, db } from "../firebase"; // Adjust path if needed
// import { onValue, ref } from "firebase/database";

// export default function AccountPage() {
//   const [account, setAccount] = useState({});
//   const [wallet, setWallet] = useState({});

//   useEffect(() => {
//     const user = auth.currentUser;
//     if (!user) return;

//     // Listen to profile in Realtime DB for additional user fields
//     const profileRef = ref(db, `users/${user.uid}/profile`);
//     const unsubscribeProfile = onValue(profileRef, (snap) => {
//       const profile = snap.val() || {};
//       setAccount({
//         name: user.displayName || profile.name || "-",
//         email: user.email || profile.email || "-",
//         user_id: profile.user_id || "-",
//         broker: profile.broker || "-",
//         mobile: profile.mobile || "-",
//       });
//     });

//     // Listen to wallet data
//     const walletRef = ref(db, `users/${user.uid}/wallet`);
//     const unsubscribeWallet = onValue(walletRef, (snap) => {
//       setWallet(snap.val() || {});
//     });

//     return () => {
//       unsubscribeProfile();
//       unsubscribeWallet();
//     };
//   }, []);

//   const formatCurrency = (amount) => {
//     const num = Number(amount) || 0;
//     return `₹${num.toLocaleString("en-IN")}`;
//   };

//   const stats = [
//     { icon: <FiUser size={20} />, label: "Name", value: account.name || "Loading...", color: "#6366f1" },
//     { icon: <FiHash size={20} />, label: "User ID", value: account.user_id || "-", color: "#10b981" },
//     { icon: <FiMail size={20} />, label: "Email", value: account.email || "-", color: "#f59e0b" },
//     { icon: <FiCreditCard size={20} />, label: "Broker", value: account.broker || "-", color: "#3b82f6" },
//     { icon: <FiPhone size={20} />, label: "Mobile", value: account.mobile || "-", color: "#ef4444" },
//     { icon: <FiTrendingUp size={20} />, label: "Investment Amount", value: formatCurrency(wallet.invested), color: "#22c55e" },
//     { icon: <FiAward size={20} />, label: "Account Status", value: "Verified", color: "#8b5cf6" },
//     { icon: <FiShield size={20} />, label: "Security Level", value: "High", color: "#ec4899" },
//   ];

//   return (
//     <motion.div className="account-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
//       <motion.div className="account-card" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
//         <motion.div className="account-header" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
//           <motion.h2 initial={{ y: -10 }} animate={{ y: 0 }} transition={{ delay: 0.5 }}>
//             Account Overview
//           </motion.h2>
//           <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
//             Your personalized account dashboard
//           </motion.p>
//         </motion.div>

//         <div className="account-stats">
//           {stats.map((stat, index) => (
//             <motion.div
//               key={index}
//               className="stat-card"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 100 }}
//               whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
//             >
//               <div className="stat-icon" style={{ background: stat.color }}>
//                 {stat.icon}
//               </div>
//               <div className="stat-content">
//                 <span className="stat-label">{stat.label}</span>
//                 <motion.span className="stat-value" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + index * 0.1 }}>
//                   {stat.value}
//                 </motion.span>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         <motion.div className="account-footer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
//           <div className="security-badge">
//             <FiShield size={18} />
//             <span>Secure & Encrypted Connection</span>
//           </div>
//         </motion.div>
//       </motion.div>

//       <style jsx>{`
//         .account-container {
//           padding: 2rem;
//           width: 100%;
//           max-width: 1200px;
//           margin: 0 auto;
//         }
//         .account-card {
//           background: white;
//           border-radius: 24px;
//           box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
//           overflow: hidden;
//           padding: 3rem;
//           position: relative;
//           z-index: 1;
//           backdrop-filter: blur(10px);
//           border: 1px solid rgba(255, 255, 255, 0.2);
//           background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%);
//         }
//         .account-card::before {
//           content: "";
//           position: absolute;
//           top: -50%;
//           left: -50%;
//           width: 200%;
//           height: 200%;
//           background: radial-gradient(circle at center, rgba(99, 102, 241, 0.05) 0%, transparent 70%);
//           z-index: -1;
//           animation: rotate 20s linear infinite;
//         }
//         .account-header {
//           margin-bottom: 3rem;
//           text-align: center;
//         }
//         .account-header h2 {
//           font-size: 2.2rem;
//           color: #1f2937;
//           margin-bottom: 0.5rem;
//           font-weight: 700;
//           background: linear-gradient(90deg, #3b82f6, #8b5cf6);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//         }
//         .account-header p {
//           color: #6b7280;
//           font-size: 1rem;
//           max-width: 500px;
//           margin: 0 auto;
//         }
//         .account-stats {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//           gap: 2rem;
//           margin-bottom: 3rem;
//         }
//         .stat-card {
//           background: rgba(255, 255, 255, 0.8);
//           border-radius: 16px;
//           padding: 1.75rem;
//           display: flex;
//           align-items: center;
//           transition: all 0.3s ease;
//           border: 1px solid rgba(0, 0, 0, 0.05);
//           backdrop-filter: blur(5px);
//           position: relative;
//           overflow: hidden;
//         }
//         .stat-card:hover {
//           transform: translateY(-5px);
//           border-color: rgba(0, 0, 0, 0.1);
//         }
//         .stat-icon {
//           color: white;
//           width: 48px;
//           height: 48px;
//           border-radius: 12px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           margin-right: 1.5rem;
//           flex-shrink: 0;
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//         }
//         .stat-content {
//           display: flex;
//           flex-direction: column;
//         }
//         .stat-label {
//           font-size: 0.85rem;
//           color: #6b7280;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//           margin-bottom: 0.5rem;
//           font-weight: 600;
//         }
//         .stat-value {
//           font-size: 1.25rem;
//           font-weight: 700;
//           color: #1f2937;
//         }
//         .account-footer {
//           text-align: center;
//           padding-top: 2rem;
//           border-top: 1px solid rgba(0, 0, 0, 0.05);
//         }
//         .security-badge {
//           display: inline-flex;
//           align-items: center;
//           gap: 0.5rem;
//           color: #6b7280;
//           font-size: 0.9rem;
//           padding: 0.5rem 1rem;
//           border-radius: 20px;
//           background: rgba(0, 0, 0, 0.02);
//           border: 1px solid rgba(0, 0, 0, 0.05);
//         }
//         @keyframes rotate {
//           from {
//             transform: rotate(0deg);
//           }
//           to {
//             transform: rotate(360deg);
//           }
//         }
//       `}</style>
//     </motion.div>
//   );
// }































import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiUser, FiMail, FiCreditCard, FiHash, FiAward,
  FiShield, FiPhone, FiTrendingUp
} from "react-icons/fi";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";

export default function AccountPage() {
  const [account, setAccount] = useState({});
  const [wallet, setWallet] = useState({});

  useEffect(() => {
    // Using single-user demo structure (no uid)
    const profileRef = ref(db, "account");
    const walletRef = ref(db, "wallet");

    const unsubProfile = onValue(profileRef, (snap) => {
      setAccount(snap.val() || {});
    });
    const unsubWallet = onValue(walletRef, (snap) => {
      setWallet(snap.val() || {});
    });

    // Cleanup listeners on unmount
    return () => {
      unsubProfile();
      unsubWallet();
    };
  }, []);

  const formatCurrency = (amount) => {
    const num = Number(amount) || 0;
    return `₹${num.toLocaleString("en-IN")}`;
  };

  const stats = [
    { icon: <FiUser size={20} />, label: "Name", value: account.name || "Loading...", color: "#6366f1" },
    { icon: <FiHash size={20} />, label: "User ID", value: account.user_id || "-", color: "#10b981" },
    { icon: <FiMail size={20} />, label: "Email", value: account.email || "-", color: "#f59e0b" },
    { icon: <FiCreditCard size={20} />, label: "Broker", value: account.broker || "-", color: "#3b82f6" },
    { icon: <FiPhone size={20} />, label: "Mobile", value: account.mobile || "-", color: "#ef4444" },
    { icon: <FiTrendingUp size={20} />, label: "Investment Amount", value: formatCurrency(wallet.invested), color: "#22c55e" },
    { icon: <FiAward size={20} />, label: "Account Status", value: "Verified", color: "#8b5cf6" },
    { icon: <FiShield size={20} />, label: "Security Level", value: "High", color: "#ec4899" },
  ];

  return (
    <motion.div className="account-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <motion.div className="account-card" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
        <motion.div className="account-header" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <motion.h2 initial={{ y: -10 }} animate={{ y: 0 }} transition={{ delay: 0.5 }}>
            Account Overview
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            Your personalized account dashboard
          </motion.p>
        </motion.div>

        <div className="account-stats">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="stat-icon" style={{ background: stat.color }}>
                {stat.icon}
              </div>
              <div className="stat-content">
                <span className="stat-label">{stat.label}</span>
                <motion.span className="stat-value" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + index * 0.1 }}>
                  {stat.value}
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="account-footer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          <div className="security-badge">
            <FiShield size={18} />
            <span>Secure & Encrypted Connection</span>
          </div>
        </motion.div>
      </motion.div>
      {/* Styles remain unchanged */}
      <style jsx>{`
        .account-container {
          padding: 2rem;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }
        .account-card {
          background: white;
          border-radius: 24px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          padding: 3rem;
          position: relative;
          z-index: 1;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%);
        }
        .account-card::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at center, rgba(99, 102, 241, 0.05) 0%, transparent 70%);
          z-index: -1;
          animation: rotate 20s linear infinite;
        }
        .account-header {
          margin-bottom: 3rem;
          text-align: center;
        }
        .account-header h2 {
          font-size: 2.2rem;
          color: #1f2937;
          margin-bottom: 0.5rem;
          font-weight: 700;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .account-header p {
          color: #6b7280;
          font-size: 1rem;
          max-width: 500px;
          margin: 0 auto;
        }
        .account-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }
        .stat-card {
          background: rgba(255, 255, 255, 0.8);
          border-radius: 16px;
          padding: 1.75rem;
          display: flex;
          align-items: center;
          transition: all 0.3s ease;
          border: 1px solid rgba(0, 0, 0, 0.05);
          backdrop-filter: blur(5px);
          position: relative;
          overflow: hidden;
        }
        .stat-card:hover {
          transform: translateY(-5px);
          border-color: rgba(0, 0, 0, 0.1);
        }
        .stat-icon {
          color: white;
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 1.5rem;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .stat-content {
          display: flex;
          flex-direction: column;
        }
        .stat-label {
          font-size: 0.85rem;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }
        .stat-value {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1f2937;
        }
        .account-footer {
          text-align: center;
          padding-top: 2rem;
          border-top: 1px solid rgba(0, 0, 0, 0.05);
        }
        .security-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #6b7280;
          font-size: 0.9rem;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          background: rgba(0, 0, 0, 0.02);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }
        @keyframes rotate {
          from { transform: rotate(0deg);}
          to { transform: rotate(360deg);}
        }
      `}</style>
    </motion.div>
  );
}








