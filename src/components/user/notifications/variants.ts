export const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,

    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  exit: {
    opacity: 0,
    y: -20,

    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

export const readBtnVariants = {
  initial: {
    scale: 1,
    opacity: 0.9,
  },
  hover: {
    scale: 1.1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 250,
    },
  },
};
