import StatusCode from './enumeration/StatusCode';

interface ResponseEntity {
  headers: object;
  statusCodeValue: number;
  body: object;
  statusCode: StatusCode;
}

export default ResponseEntity;
