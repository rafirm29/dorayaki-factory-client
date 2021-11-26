import React from "react"
import Template from "../../components/template"
import { Inbound, InboundStatus } from "../../interface/inbound/Inbound"
import { AcceptInbound, GetAllInbound, RejectInbound } from "../../api/inbound"
import { Button, Input, Table, Tag, Pagination, message } from "antd"
import Column from "antd/lib/table/Column"
import { useApi } from "../../context/api"
const { Search } = Input

const formatDate = (date: Date) => ``

export default () => {
    const api = useApi()
    const [requests, setRequests] = React.useState<Inbound[]>([])
    const [page, setPage] = React.useState(1)
    const [totalItem, setTotalItem] = React.useState(0)
    const Refresh = async () => {
        const response = await GetAllInbound(api.apiClient, page)
        setRequests(response.data.items)
        setTotalItem(response.data.totalItems)
    }
    React.useEffect(() => {
        Refresh()
    }, [page])

    const acceptRequest = (data) => {
        const id = data.id
        AcceptInbound(api.apiClient, id)
            .then(() => {
                message.info("Inbound berhasil diterima!!")
                Refresh()
            })
            .catch((e) => {
                message.error(e.response.data.data.details)
            })
    }

    const rejectRequest = (data) => {
        const id = data.id
        RejectInbound(api.apiClient, id)
            .then(() => {
                message.info("Inbound berhasil ditolak!!")
                Refresh()
            })
            .catch((e) => {
                message.error(e.response.data.data.details)
            })
    }

    return (
        <Template title="Daftar Request">
            <Table
                dataSource={requests}
                rowKey="id"
                pagination={false}
                className="w-full"
            >
                <Column
                    title="Dorayaki"
                    dataIndex={["dorayaki", "name"]}
                ></Column>
                <Column title="Jumlah" dataIndex="amount"></Column>
                <Column
                    title="Tanggal Permintaan"
                    dataIndex="createdAt"
                    render={(createdAt: string) => (
                        <p>{new Date(createdAt).toDateString()}</p>
                    )}
                ></Column>
                <Column
                    title="Status"
                    dataIndex="status"
                    render={(status) => <StatusTag status={status} />}
                ></Column>
                <Column
                    title="Aksi"
                    dataIndex="status"
                    render={(status, data, i) => {
                        if (
                            status === InboundStatus.ACCEPTED ||
                            status === InboundStatus.REJECTED ||
                            status === InboundStatus.RECEIVED
                        ) {
                            return <p>-</p>
                        }
                        return (
                            <div>
                                <Button
                                    className="mr-2"
                                    type="primary"
                                    onClick={() => acceptRequest(data)}
                                >
                                    Accept
                                </Button>
                                <Button
                                    type="primary"
                                    danger
                                    onClick={() => rejectRequest(data)}
                                >
                                    Reject
                                </Button>
                            </div>
                        )
                    }}
                ></Column>
            </Table>
            <Pagination
                pageSize={10}
                current={page}
                total={totalItem}
                onChange={(page) => setPage(page)}
            />
        </Template>
    )
}

interface StatusProps {
  status: InboundStatus
}

const StatusTag = (props: StatusProps) => {
  const TextMapping = {
    [InboundStatus.ACCEPTED]: "Accepted",
    [InboundStatus.RECEIVED]: "Received",
    [InboundStatus.REJECTED]: "Declined",
    [InboundStatus.REQUESTING]: "Pending",
  }

  const ColorMapping = {
    [InboundStatus.ACCEPTED]: "success",
    [InboundStatus.RECEIVED]: "default",
    [InboundStatus.REJECTED]: "error",
    [InboundStatus.REQUESTING]: "processing",
  }
  return (
    <Tag color={ColorMapping[props.status]}>{TextMapping[props.status]}</Tag>
  )
}
