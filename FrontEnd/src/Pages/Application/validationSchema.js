import * as yup from 'yup';

const telephoneRegex = /^(0\d{9}|\+94\d{9}|\+940\d{9})$/;
const nicRegex = /^[0-9]{12}$|^[0-9]{9}[vV]$/;

const validationSchema = yup.object().shape({
  tele: yup.string().matches(telephoneRegex, 'Invalid Telephone Number').required('Required'),
  nic: yup.string().matches(nicRegex, 'Invalid NIC format').required('Required'),
  addressNumber: yup.string().required('Required'),
  street1: yup.string().required('Required'),
  street2: yup.string(),
  city: yup.string().required('Required'),
  gramaSevaDivision: yup.string().required('Required'),
});

export default validationSchema;