import { TemplateAttributeType } from './enumeration/TemplateAttributeType';

export interface TemplateAttribute {
  name: string;
  id?: number;
  type: TemplateAttributeType;
  required: boolean;
}
