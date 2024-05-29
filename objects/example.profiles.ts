export enum PaymentQuotaStatus {
  PENDING = "Pendiente",
  PARTIALLY_PAID = "Parcialmente Pagada",
  COMPLETE = "Completa",
}

export type PaymentQuota = {
  /** El numero de la cuota, del 0 al 12. */
  sequence: number;

  /** La fecha de vencimiento de la cuota. */
  due_date: string;

  /** El monto de la cuota. */
  amount: number;

  /** El estado de la cuota. */
  status: PaymentQuotaStatus;
};

export type StudentProfile = {
  /** El nombre del alumno. */
  name: string;

  /** La edad del alumno. */
  age: number;

  /** El numero de telefono (E.164) del alumno. */
  phone: string;

  /** El nombre de la carrera en curso/finalizada del alumno. */
  career: string;

  /** El estado academico del alumno. */
  status: string;

  /** El plan de pagos del alumno. */
  payments: Array<PaymentQuota>;
};

export const ExampleProfiles: Array<StudentProfile> = [
  {
    name: "Lucas",
    age: 23,
    phone: '+549351223344',
    career: "Ingenieria Informatica",
    status: "Activo",
    payments: [
      {
        sequence: 1,
        due_date: "2024-06-15",
        amount: 85,
        status: PaymentQuotaStatus.COMPLETE,
      },
      {
        sequence: 2,
        due_date: "2024-07-15",
        amount: 85,
        status: PaymentQuotaStatus.COMPLETE,
      },
      {
        sequence: 3,
        due_date: "2024-08-15",
        amount: 85,
        status: PaymentQuotaStatus.COMPLETE,
      },
      {
        sequence: 4,
        due_date: "2024-09-15",
        amount: 85,
        status: PaymentQuotaStatus.COMPLETE,
      },
      {
        sequence: 5,
        due_date: "2024-10-15",
        amount: 85,
        status: PaymentQuotaStatus.COMPLETE,
      },
      {
        sequence: 6,
        due_date: "2024-11-15",
        amount: 85,
        status: PaymentQuotaStatus.PENDING,
      },
      {
        sequence: 7,
        due_date: "2024-12-15",
        amount: 85,
        status: PaymentQuotaStatus.PENDING,
      },
      {
        sequence: 8,
        due_date: "2025-01-15",
        amount: 85,
        status: PaymentQuotaStatus.PENDING,
      },
      {
        sequence: 9,
        due_date: "2025-02-15",
        amount: 85,
        status: PaymentQuotaStatus.PENDING,
      },
      {
        sequence: 10,
        due_date: "2025-03-15",
        amount: 85,
        status: PaymentQuotaStatus.PENDING,
      },
      {
        sequence: 11,
        due_date: "2025-04-15",
        amount: 85,
        status: PaymentQuotaStatus.PENDING,
      },
      {
        sequence: 12,
        due_date: "2025-05-15",
        amount: 85,
        status: PaymentQuotaStatus.PENDING,
      },
    ],
  },
  {
    name: "Jeronimo",
    age: 23,
    phone: '+52155667788',
    career: "Licenciatura en Administracion",
    status: "Activo",
    payments: [
      {
        sequence: 1,
        due_date: "2024-06-15",
        amount: 85,
        status: PaymentQuotaStatus.COMPLETE,
      },
      {
        sequence: 2,
        due_date: "2024-07-15",
        amount: 85,
        status: PaymentQuotaStatus.COMPLETE,
      },
      {
        sequence: 3,
        due_date: "2024-08-15",
        amount: 85,
        status: PaymentQuotaStatus.COMPLETE,
      },
      {
        sequence: 4,
        due_date: "2024-09-15",
        amount: 85,
        status: PaymentQuotaStatus.PENDING,
      },
      {
        sequence: 5,
        due_date: "2024-10-15",
        amount: 85,
        status: PaymentQuotaStatus.PENDING,
      },
      {
        sequence: 6,
        due_date: "2024-11-15",
        amount: 85,
        status: PaymentQuotaStatus.PENDING,
      },
      {
        sequence: 7,
        due_date: "2024-12-15",
        amount: 85,
        status: PaymentQuotaStatus.PENDING,
      },
      {
        sequence: 8,
        due_date: "2025-01-15",
        amount: 85,
        status: PaymentQuotaStatus.PENDING,
      },
      {
        sequence: 9,
        due_date: "2025-02-15",
        amount: 85,
        status: PaymentQuotaStatus.PENDING,
      },
      {
        sequence: 10,
        due_date: "2025-03-15",
        amount: 85,
        status: PaymentQuotaStatus.PENDING,
      },
      {
        sequence: 11,
        due_date: "2025-04-15",
        amount: 85,
        status: PaymentQuotaStatus.PENDING,
      },
      {
        sequence: 12,
        due_date: "2025-05-15",
        amount: 85,
        status: PaymentQuotaStatus.PENDING,
      },
    ],
  },
  {
    name: "Franco",
    age: 23,
    phone: '+549113223322',
    career: "Certificacion en Marketing Digital",
    status: "Ingresante",
    payments: [
      {
        sequence: 1,
        due_date: "2024-06-15",
        amount: 85,
        status: PaymentQuotaStatus.COMPLETE,
      },
      {
        sequence: 2,
        due_date: "2024-07-15",
        amount: 85,
        status: PaymentQuotaStatus.PENDING,
      },
      {
        sequence: 3,
        due_date: "2024-08-15",
        amount: 85,
        status: PaymentQuotaStatus.PENDING,
      },
      {
        sequence: 4,
        due_date: "2024-09-15",
        amount: 85,
        status: PaymentQuotaStatus.PENDING,
      },
      {
        sequence: 5,
        due_date: "2024-10-15",
        amount: 85,
        status: PaymentQuotaStatus.PENDING,
      },
      {
        sequence: 6,
        due_date: "2024-11-15",
        amount: 85,
        status: PaymentQuotaStatus.PENDING,
      },
      {
        sequence: 7,
        due_date: "2024-12-15",
        amount: 85,
        status: PaymentQuotaStatus.PENDING,
      },
      {
        sequence: 8,
        due_date: "2025-01-15",
        amount: 85,
        status: PaymentQuotaStatus.PENDING,
      },
      {
        sequence: 9,
        due_date: "2025-02-15",
        amount: 85,
        status: PaymentQuotaStatus.PENDING,
      },
      {
        sequence: 10,
        due_date: "2025-03-15",
        amount: 85,
        status: PaymentQuotaStatus.PENDING,
      },
      {
        sequence: 11,
        due_date: "2025-04-15",
        amount: 85,
        status: PaymentQuotaStatus.PENDING,
      },
      {
        sequence: 12,
        due_date: "2025-05-15",
        amount: 85,
        status: PaymentQuotaStatus.PENDING,
      },
    ],
  },
];
