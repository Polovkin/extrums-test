import {appError} from "../store";
import {FC, useEffect, useState} from "react";
import {Alert} from "react-bootstrap";

type Props = {
    error: appError
}

const AppError: FC<Props> = ({error}) => {
    const [isVisible, setIsVisible] = useState(!!error)

    const handleAlertClose = () => {
        setIsVisible(true)
        const timer = setTimeout(() => {
            setIsVisible(false)
        }, 5000)
        return () => clearTimeout(timer)
    }

    useEffect(() => {
        if (error) {
            handleAlertClose()
        }
    }, [error])

    if (!isVisible) return null

    return (
        <div className="position-fixed top-0 start-50 translate-middle-x p-4">
            <Alert variant="danger">
                {error?.message}
            </Alert>
        </div>

    )
}
export default AppError
