import { formatValue } from 'react-currency-input-field';

export const formatCurrency = (floatValue) => {
    return formatValue({groupSeparator:',', decimalScale: 2, decimalSeparator:'.',prefix:'$', value:floatValue.toString()})
};