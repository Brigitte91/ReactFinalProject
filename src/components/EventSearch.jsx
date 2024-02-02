import { Input } from "@chakra-ui/react";

export const EventSearch = ({ searchTerm, onSearchChange }) => {

    return (
        <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            mb={6}
        />
    );
}