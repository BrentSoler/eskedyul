export default function getStatusColor(status: string) {
    const statusMsg = status;
    let color;
    switch (statusMsg) {
        case 'Pending':
            color = "bg-warning";
            break;
        case 'Completed':
            color = "bg-success";
            break;
        case 'Ongoing':
            color = "bg-info";
            break;
        case 'Cancelled':
            color = "bg-error";
            break;
        default:
    }
    return color
}

