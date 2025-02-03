export const statusConfig = {
  rejected: {
    bgcolor: "bg-[#F73639]",
    textcolor: "text-[#F73639]",
  },
  pending: {
    bgcolor: "bg-[#E1BF00]",
    textcolor: "text-[#F73639]",
  },
  accepted: {
    bgcolor: "bg-[#44BB1D]",
    textcolor: "text-[#44BB1D]",
  },
};

export const def_user = {
  uID: 123,
  businessName: "Arya",
  email: "atila@gmail.com",
  principal: "1234",
  isVerified: true,
  contracts: [1]
}

export const def_contract = {
  cID: "234567890",
  contractName: "Contract Name",
  contractDescription:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dapibus vulputate justo commodo ultrices. Proin fringilla enim est. Suspendisse tincidunt ut lacus vel convallis.",
  contractParties: ["Parties1", "Parties2", "Parties3"],
  lastModified: "22/02/2027",
  isFinalised: -1,
  itemIDs: 1234,
  keyExchange: [[1, "str", "str"]]
}

export const def_list_contractItem = [
  {
    iID: "123123",
    cID: "123123",
    title: "example docs 1",
    description: "Lorem Ipsum",
    parties: ["Parties1", "Parties2", "Parties3"],
    isFinalised: -1,
    type: "document",
    dateCreated: "22/02/2027",
    fileName: "Arya",
    fileID: "Aryaasd",
    fileHash: "asjdalsd"
  },
  {
    iID: "1231093",
    cID: "123123",
    title: "example docs 1",
    description: "Lorem Ipsum",
    parties: ["Parties1", "Parties2", "Parties3"],
    isFinalised: -1,
    type: "meeting",
    dateCreated: "22/02/2022",
    meetingURL: "url",
    meetingFileID: [
      {
        uid: 123,
        id: "String",
        hash: "asdjkasd"
      }
    ],
    meetingEnded: true
  },
]

export const def_file_contractItem =   {
  iID: "123123",
  cID: "123123",
  title: "example docs 1",
  description: "Lorem Ipsum",
  parties: ["Parties1", "Parties2", "Parties3"],
  isFinalised: -1,
  type: "document",
  dateCreated: "22/02/2027",
  fileName: "Arya",
  fileID: "Aryaasd",
  fileHash: "asjdalsd"
}

export const def_meet_contractItem = {
  iID: "1231093",
  cID: "123123",
  title: "example docs 1",
  description: "Lorem Ipsum",
  parties: ["Parties1", "Parties2", "Parties3"],
  isFinalised: -1,
  type: "meeting",
  dateCreated: "22/02/2022",
	meetingURL: "url",
	meetingFileID: [
    {
      uid: 123,
      id: "String",
      hash: "asdjkasd"
    }
  ],
	meetingEnded: true
}