import type { Schema, Struct } from '@strapi/strapi';

export interface BlogArticleList extends Struct.ComponentSchema {
  collectionName: 'components_blog_article_lists';
  info: {
    description: 'Comma-separated blog row IDs; FE hydrates article cards';
    displayName: 'Article list';
  };
  attributes: {
    articleIds: Schema.Attribute.Text;
    heading: Schema.Attribute.String;
  };
}

export interface BlogCategoryList extends Struct.ComponentSchema {
  collectionName: 'components_blog_category_lists';
  info: {
    description: 'Comma-separated health-condition category names';
    displayName: 'Category list';
  };
  attributes: {
    categories: Schema.Attribute.Text;
    heading: Schema.Attribute.String;
  };
}

export interface BlogFaqBlock extends Struct.ComponentSchema {
  collectionName: 'components_blog_faq_blocks';
  info: {
    description: 'Repeatable FAQ list placed anywhere in the body';
    displayName: 'FAQ block';
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.DefaultTo<'FAQs'>;
    items: Schema.Attribute.Component<'shared.faq', true>;
  };
}

export interface BlogMedicineList extends Struct.ComponentSchema {
  collectionName: 'components_blog_medicine_lists';
  info: {
    description: 'Comma-separated master drug codes; FE hydrates product cards';
    displayName: 'Medicine list';
  };
  attributes: {
    drugCodes: Schema.Attribute.Text;
    heading: Schema.Attribute.String;
  };
}

export interface BlogReferencesBlock extends Struct.ComponentSchema {
  collectionName: 'components_blog_references_blocks';
  info: {
    description: 'Repeatable references list placed anywhere in the body';
    displayName: 'References block';
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.DefaultTo<'References'>;
    items: Schema.Attribute.Component<'shared.references', true>;
  };
}

export interface BlogSection extends Struct.ComponentSchema {
  collectionName: 'components_blog_sections';
  info: {
    description: 'Heading + rich text block (Quick Summary and any other copy section)';
    displayName: 'Section';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
    heading: Schema.Attribute.String;
  };
}

export interface BlogTable extends Struct.ComponentSchema {
  collectionName: 'components_blog_tables';
  info: {
    description: 'Column headings across the top, row headings down the first column. Data cells sit at each intersection.';
    displayName: 'Table';
  };
  attributes: {
    columns: Schema.Attribute.Component<'blog.table-column', true>;
    heading: Schema.Attribute.String;
    rowHeaderLabel: Schema.Attribute.String;
    rows: Schema.Attribute.Component<'blog.table-row', true>;
  };
}

export interface BlogTableCell extends Struct.ComponentSchema {
  collectionName: 'components_blog_table_cells';
  info: {
    description: 'Plain text plus color. Use for a row heading or a data cell. default=black, green, coral.';
    displayName: 'Table cell';
  };
  attributes: {
    color: Schema.Attribute.Enumeration<['default', 'green', 'coral']> &
      Schema.Attribute.DefaultTo<'default'>;
    text: Schema.Attribute.Text;
    weight: Schema.Attribute.Enumeration<['normal', 'bold']> &
      Schema.Attribute.DefaultTo<'normal'>;
  };
}

export interface BlogTableColumn extends Struct.ComponentSchema {
  collectionName: 'components_blog_table_columns';
  info: {
    description: 'One heading across the top. Do not add the row-heading column here \u2014 that is rowHeaderLabel.';
    displayName: 'Column heading';
  };
  attributes: {
    label: Schema.Attribute.String;
  };
}

export interface BlogTableRow extends Struct.ComponentSchema {
  collectionName: 'components_blog_table_rows';
  info: {
    description: 'Row heading (first column) plus one data cell per column heading, left to right.';
    displayName: 'Table row';
  };
  attributes: {
    cells: Schema.Attribute.Component<'blog.table-cell', true>;
    rowHeading: Schema.Attribute.Component<'blog.table-cell', false>;
  };
}

export interface DiseaseContentBlock extends Struct.ComponentSchema {
  collectionName: 'components_disease_content_blocks';
  info: {
    displayName: 'Content Block';
    icon: 'grid';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
    heading: Schema.Attribute.String;
    highlight: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface DiseaseFaqBlock extends Struct.ComponentSchema {
  collectionName: 'components_disease_faq_blocks';
  info: {
    displayName: 'FAQ Block';
    icon: 'grid';
  };
  attributes: {
    afterContent: Schema.Attribute.Blocks;
    beforeContent: Schema.Attribute.Blocks;
    faqs: Schema.Attribute.Component<'disease.faq-item', true>;
    heading: Schema.Attribute.String;
  };
}

export interface DiseaseFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_disease_faq_items';
  info: {
    displayName: 'QnA Item';
    icon: 'expand';
  };
  attributes: {
    answer: Schema.Attribute.Text;
    question: Schema.Attribute.String;
  };
}

export interface DiseaseJsonLdSchema extends Struct.ComponentSchema {
  collectionName: 'components_disease_json_ld_schemas';
  info: {
    displayName: 'JSON-LD Schema';
    icon: 'grid';
  };
  attributes: {
    possibleComplications: Schema.Attribute.Text;
    possibleTreatments: Schema.Attribute.Component<
      'disease.possible-treatment-item',
      true
    >;
    signOrSymptoms: Schema.Attribute.Text;
  };
}

export interface DiseaseMedicineList extends Struct.ComponentSchema {
  collectionName: 'components_disease_medicine_lists';
  info: {
    displayName: 'Medicine List';
    icon: 'grid';
  };
  attributes: {
    afterContent: Schema.Attribute.Blocks;
    beforeContent: Schema.Attribute.Blocks;
    drugCodes: Schema.Attribute.String;
    heading: Schema.Attribute.String;
  };
}

export interface DiseaseMetadata extends Struct.ComponentSchema {
  collectionName: 'components_disease_metadata';
  info: {
    displayName: 'SEO Metadata';
    icon: 'grid';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text;
    metaKeywords: Schema.Attribute.Text;
    metaTitle: Schema.Attribute.String;
    ogUrl: Schema.Attribute.String;
  };
}

export interface DiseasePossibleTreatmentItem extends Struct.ComponentSchema {
  collectionName: 'components_disease_possible_treatment_items';
  info: {
    displayName: 'Possible Treatment Item';
    icon: 'expand';
  };
  attributes: {
    description: Schema.Attribute.Text;
    name: Schema.Attribute.String;
  };
}

export interface DiseaseReferenceItem extends Struct.ComponentSchema {
  collectionName: 'components_disease_reference_items';
  info: {
    displayName: 'Reference Item';
    icon: 'expand';
  };
  attributes: {
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface DiseaseReferencesBlock extends Struct.ComponentSchema {
  collectionName: 'components_disease_references_blocks';
  info: {
    displayName: 'References Block';
    icon: 'grid';
  };
  attributes: {
    afterContent: Schema.Attribute.Blocks;
    beforeContent: Schema.Attribute.Blocks;
    heading: Schema.Attribute.String;
    references: Schema.Attribute.Component<'disease.reference-item', true>;
  };
}

export interface DiseaseTableBlock extends Struct.ComponentSchema {
  collectionName: 'components_disease_table_blocks';
  info: {
    displayName: 'Table Block';
    icon: 'grid';
  };
  attributes: {
    afterContent: Schema.Attribute.Blocks;
    beforeContent: Schema.Attribute.Blocks;
    heading: Schema.Attribute.String;
    table: Schema.Attribute.Component<'shared.table', false>;
  };
}

export interface SharedFaq extends Struct.ComponentSchema {
  collectionName: 'components_shared_faqs';
  info: {
    displayName: 'FAQ';
  };
  attributes: {
    Answer: Schema.Attribute.Text;
    Question: Schema.Attribute.Text;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedReferences extends Struct.ComponentSchema {
  collectionName: 'components_shared_references';
  info: {
    displayName: 'References';
  };
  attributes: {
    Author: Schema.Attribute.String;
    Date: Schema.Attribute.Date;
    Title: Schema.Attribute.String;
    URL: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSafetyAdvice extends Struct.ComponentSchema {
  collectionName: 'components_shared_safety_advices';
  info: {
    displayName: 'Safety Advice';
  };
  attributes: {
    advices: Schema.Attribute.Text;
    safety_info_tag: Schema.Attribute.Enumeration<
      ['Unsafe', 'Caution', 'Safe', 'Limited information']
    > &
      Schema.Attribute.Required;
    topic: Schema.Attribute.Enumeration<
      [
        'Allergy',
        'Pregnancy',
        'Breastfeeding',
        'Alcohol',
        'Driving',
        'Liver',
        'Kidney',
        'Children',
        'Elderly Patients',
      ]
    > &
      Schema.Attribute.Required;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    advices: Schema.Attribute.Blocks;
  };
}

export interface SharedTable extends Struct.ComponentSchema {
  collectionName: 'components_shared_tables';
  info: {
    displayName: 'Table';
  };
  attributes: {
    headers: Schema.Attribute.Component<'shared.table-cell', true>;
    rows: Schema.Attribute.Component<'shared.table-row', true>;
  };
}

export interface SharedTableCell extends Struct.ComponentSchema {
  collectionName: 'components_shared_table_cells';
  info: {
    displayName: 'Table Cell';
  };
  attributes: {
    value: Schema.Attribute.String;
  };
}

export interface SharedTableRow extends Struct.ComponentSchema {
  collectionName: 'components_shared_table_rows';
  info: {
    displayName: 'Table Row';
  };
  attributes: {
    cells: Schema.Attribute.Component<'shared.table-cell', true>;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'blog.article-list': BlogArticleList;
      'blog.category-list': BlogCategoryList;
      'blog.faq-block': BlogFaqBlock;
      'blog.medicine-list': BlogMedicineList;
      'blog.references-block': BlogReferencesBlock;
      'blog.section': BlogSection;
      'blog.table': BlogTable;
      'blog.table-cell': BlogTableCell;
      'blog.table-column': BlogTableColumn;
      'blog.table-row': BlogTableRow;
      'disease.content-block': DiseaseContentBlock;
      'disease.faq-block': DiseaseFaqBlock;
      'disease.faq-item': DiseaseFaqItem;
      'disease.json-ld-schema': DiseaseJsonLdSchema;
      'disease.medicine-list': DiseaseMedicineList;
      'disease.metadata': DiseaseMetadata;
      'disease.possible-treatment-item': DiseasePossibleTreatmentItem;
      'disease.reference-item': DiseaseReferenceItem;
      'disease.references-block': DiseaseReferencesBlock;
      'disease.table-block': DiseaseTableBlock;
      'shared.faq': SharedFaq;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.references': SharedReferences;
      'shared.rich-text': SharedRichText;
      'shared.safety-advice': SharedSafetyAdvice;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'shared.table': SharedTable;
      'shared.table-cell': SharedTableCell;
      'shared.table-row': SharedTableRow;
    }
  }
}
