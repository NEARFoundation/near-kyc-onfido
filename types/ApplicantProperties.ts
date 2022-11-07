interface ApplicantProperties {
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  csrf_token?: string;
  consent?: boolean;
}

export default ApplicantProperties;
