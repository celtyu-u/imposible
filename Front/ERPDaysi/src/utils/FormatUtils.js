class FormatUtils{
    static formatCurrency = (value) => {
        if (!value) return "";
        return `$${Number(value).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;
      };

      static formatNumber = (value) => {
        if (!value) return "";
        return `${Number(value).toLocaleString("en-US", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })}`;
      };

}

export default FormatUtils;