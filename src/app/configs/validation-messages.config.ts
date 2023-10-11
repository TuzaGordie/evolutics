import { IValidationMessage } from '../Shared/models/index.model';

export const configValidationMessages = {
  normal: [
    { type: 'required', message: ' is required.' },
    {
      type: 'maxLength',
      message: ' must be at most {{maxLength}} characters long.',
    },
    {
      type: 'maxlength',
      message: ' must be at most {{maxLength}} characters long.',
    },
    {
      type: 'minLength',
      message: ' must be at least {{minLength}} characters long.',
    },
    {
      type: 'minlength',
      message: ' must be at least {{minLength}} characters long.',
    },
    {
      type: 'notUnique',
      message: ' already exists.',
    },
    {
      type: 'used',
      message: ' has already been used.',
    },
    { type: 'pattern', message: ' is valid.' },
    { type: 'pattern', message: ' is valid.' },
    { type: 'notFound', message: ' doesn\'t exist' },
    { type: 'custom'  },
  ],
  address: [
    { type: 'required', message: 'Address is required.' },
    {
      type: 'minlength',
      message: 'Address must be at least 3 characters long.',
    },
  ],
  addressLGA: [
    {
      type: 'required',
      message: 'Local government of address is required.',
    },
    {
      type: 'minlength',
      message:
        'Local government of address must be at least 2 characters long.',
    },
  ],
  className: [
    { type: 'required', message: 'Class name is required.' },
    {
      type: 'minlength',
      message: 'Class name must be at least 2 characters long.',
    },
  ],
  classSection: [
    { type: 'required', message: 'Class section is required.' },
    {
      type: 'minlength',
      message: 'Class section must be at least 1 character long.',
    },
  ],
  email: [
    { type: 'required', message: 'Email is required.' },
    {
      type: 'minlength',
      message: 'Email must be at least 5 characters long.',
    },
    { type: 'pattern', message: 'Email must be valid.' },
    { type: 'email', message: 'Email must be valid' },
    {
      type: 'notUnique',
      message: 'Email already exists.',
    },
    {
      type: 'equalToOther',
      message: "Alternate email can't be the same as email",
    },
  ],
  entityNumber: [
    { type: 'required', message: ' is required.' },
    {
      type: 'invalid',
      message: ' is invalid.',
    },
    { type: 'notFound', message: ' was not found.' },
    {
      type: 'notUnique',
      message: ' already exists.',
    },
  ],
  firstname: [
    { type: 'required', message: 'First Name is required.' },
    {
      type: 'minlength',
      message: 'Name must be at least 2 characters long.',
    },
  ],
  lastname: [
    { type: 'required', message: 'Last Name is required.' },
    {
      type: 'minlength',
      message: 'Name must be at least 2 characters long.',
    },
  ],
  lga: [
    {
      type: 'required',
      message: 'Local government of origin is required.',
    },
    {
      type: 'minlength',
      message: 'Local government of origin must be at least 2 characters long.',
    },
  ],
  maidenName: [
    { type: 'required', message: 'Maiden Name is required.' },
    {
      type: 'minlength',
      message: 'Maiden Name must be at least 2 characters long.',
    },
  ],

  mobile: [
    { type: 'required', message: 'Phone number is required.' },
    {
      type: 'minlength',
      message: 'Phone number must be at least 11 characters long.',
    },
    {
      type: 'notUnique',
      message: 'Phone number already exists.',
    },
    {
      type: 'equalToOther',
      message: "Alternate phone number can't be the same as phone number",
    },
    {
      type: 'invalid',
      message: 'Phone number is invalid',
    },
    {
      type: 'countryCode',
      message: 'Country code is invalid',
    },
  ],
  name: [
    { type: 'required', message: ' is required.' },
    {
      type: 'pattern',
      message: " can only contain letters, numbers and '-'.",
    },
    {
      type: 'minlength',
      message: ' must be at least 2 characters long.',
    },
  ],
  numbers: [
    {
      type: 'pattern',
      message: 'This field must be a number.',
    },
    { type: 'required', message: 'A value is required.' },
  ],

  occupation: [
    { type: 'required', message: 'Occupation is required.' },
    {
      type: 'minlength',
      message: 'Occupation must be at least 2 characters long.',
    },
  ],

  othername: [
    { type: 'required', message: 'Other Name is required.' },
    {
      type: 'minlength',
      message: 'Name must be at least 2 characters long.',
    },
  ],
  password: [
    { type: 'required', message: 'Password is required.' },
    {
      type: 'minlength',
      message: 'Password must be at least 6 characters long.',
    },
    {
      type: 'maxlength',
      message: 'Password must be at most 6 characters long.',
    },
    { type: 'passwordNotMatch', message: 'Passwords are not the same' },
  ],
  pattern: [
    { type: 'required', message: 'Field is required.' },

    { type: 'pattern', message: 'Field is invalid.' },
  ],
  required: [
    {
      type: 'required',
      message: ' is required.',
    },
    {
      type: 'minlength',
      message: ' must be at least 2 characters long.',
    },
  ],
  sex: [
    {
      type: 'required',
      message: 'Sex is required.',
    },
  ],
  subjectName: [
    { type: 'required', message: 'Subject name is required.' },
    {
      type: 'minlength',
      message: 'Subject name must be at least 2 characters long.',
    },
  ],
  unique: [
    {
      type: 'notUnique',
      message: ' already exists.',
    },
  ],
  username: [
    {
      type: 'required',
      message: 'is required.',
    },
    {
      type: 'pattern',
      message: "Only letters,numbers and '_' are allowed.",
    },
  ],
  url: [
    {
      type: 'required',
      message: 'URL is required.',
    },
    {
      type: 'pattern',
      message: 'It does not match a URL',
    },
  ],
};
