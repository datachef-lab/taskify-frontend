import { Customer as CustomerType } from "@/lib/types";

const dummyCustomer: CustomerType = {
  id: 1,
  name: "Acme Corporation",
  email: "contact@acmecorp.com",
  address: "123 Business Park",
  state: "California",
  city: "San Francisco",
  pincode: "94103",
  phone: "415-555-1234",
  gst: "29AABCU9603R1ZJ",
  pan: "AABCU9603R",
  residentialAddress: "123 Business Park, San Francisco",
  birthDate: null,
  anniversaryDate: null,
  oldCustomerId: 101,
  parentCompany: null,
  personOfContacts: [
    {
      id: 1,
      parentCompany: null,
      customerId: 1,
      name: "John Smith",
      email: "john@acmecorp.com",
      phone: "415-555-5678",
      address: "123 Business Park",
      state: "California",
      city: "San Francisco",
      pincode: "94103",
      residentialAddress: "456 Residence Ave, San Francisco",
      birthDate: new Date("1980-05-15"),
    },
  ],
};

export default function CustomerPage() {
  return (
    <div>
      <div className="flex gap-2">
        <div className="w-1/5">
          <img
            src="/customer1.png"
            alt="A person interacting with the workshop engineer"
            width={150}
          />
        </div>
        <div>
          <p className="text-slate-500">#C00{dummyCustomer.id}</p>
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            {dummyCustomer.name}
          </h2>
          <p>{dummyCustomer.address}</p>
        </div>
      </div>
    </div>
  );
}
