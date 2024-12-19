class FormatUtils{
    static formatCurrency = (value) => {
        if (!value) return "";
        return `$${Number(value).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;
      };
}

export default FormatUtils;