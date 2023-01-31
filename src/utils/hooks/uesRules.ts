import { RulesProps } from '@arco-design/web-react/es/Form/interface';
import { useLocale } from './useLocale';
import regularVerify from '../regularVerify';
type UseRulesReturn = {
  requiredRule: RulesProps<any>;
};

const checkPoint = (value: string) => {
  const pointArr = value.split('').filter((item) => item === '.');
  return {
    hasPoint: pointArr.length > 0,
    onePoint: pointArr.length === 1 ? true : false,
  };
};

// 获取表单验证的hooks
export const useRules = (): UseRulesReturn => {
  const locale = useLocale();

  return {
    requiredRule: { required: true, message: locale('global.required') },
  };
};
