import { motion } from "motion/react";
import { useState } from "react";

// Constants
const NOTIFICATION_COUNT = 3;
const NOTIFICATION_HEIGHT = 65;
const COLLAPSED_OFFSET = -10;

export default function CollapsableNotifications() {
  const [collapse, setCollapse] = useState(true);

  const toggleCollapse = () => setCollapse(prev => !prev);

  // Animation Variants
  const itemVariants = {
    expanded: (index) => ({
      top: index * NOTIFICATION_HEIGHT,
      opacity: 1,
      scale: 1,
      transition: {
        delay: index * 0.05,
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    }),
    collapsed: (index) => ({
      top: index * COLLAPSED_OFFSET,
      opacity: index === 0 ? 1 : Math.max(1 - index * 0.15, 0),
      scale: Math.max(1 - index * 0.1 + 0.2, 0),
      transition: {
        delay: 0.1,
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    }),
  };

  return (
    <div className="text-white flex items-center justify-center w-full h-full">
      <motion.div layout className="w-64 space-y-6">
        {/* Header */}
        <motion.div
          className="flex justify-between items-center px-2"
          initial={{ opacity: 0, scale: 0.7, y: 50, height: "auto" }}
          animate={{
            opacity: collapse ? 0 : 1,
            scale: collapse ? 0.7 : 1,
            y: collapse ? 50 : 0,
            height: collapse ? "auto" : 0,
          }}
          transition={{ delay: collapse ? 0 : 0.2, duration: 0.5, type: "spring" }}
        >
          <h2 className="text-lg">Notifications</h2>

          <motion.button
            className="px-3 py-[3px] pb-1 rounded-full text-xs cursor-pointer font-medium"
            initial={{ backgroundColor: "#2b2b2b", color: "white" }}
            whileHover={{
              backgroundColor: "#fff",
              color: "#000",
              transition: { duration: 0.3 },
            }}
            onClick={toggleCollapse}
          >
            Collapse
          </motion.button>
        </motion.div>

        {/* Notifications */}
        <motion.ul
          layout
          className="relative z-0 space-y-2"
          animate={{ y: collapse ? -40 : 0 }}
        >
          {Array.from({ length: NOTIFICATION_COUNT }).map((_, index) => (
            <motion.li
              layout
              key={index}
              className="w-full h-14 rounded-xl bg-white cursor-pointer absolute"
              custom={index}
              variants={itemVariants}
              animate={collapse ? "collapsed" : "expanded"}
              onClick={toggleCollapse}
            />
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
}
