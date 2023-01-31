import { Message } from '@arco-design/web-react';
import { FormInstance } from '@arco-design/web-react/es/Form/interface';
import { validateFieldsReturn } from './types';

export const validateFields = async (
  form: FormInstance,
  globalLocale: any
): Promise<validateFieldsReturn> => {
  const resData: validateFieldsReturn = [{}, true];
  try {
    resData[0] = await form.validate();
  } catch (error) {
    resData[1] = false;
    Message.error(
      globalLocale(['data', 'validate', 'fail', 'please', 'check']) + ' ! '
    );
    throw error;
  }
  return resData;
};
