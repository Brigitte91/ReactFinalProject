/*eslint-disable*/
import { useState, useContext } from "react";
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Checkbox,
    CheckboxGroup,
    useCheckboxGroup,
    Button,
    Select
} from "@chakra-ui/react";
import { CategoryContext } from "./CategoryContext";
import { UserContext } from "./UserContext"


export const EventForm = ({ initialValues }) => {
    const { categories } = useContext(CategoryContext);
    const { users } = useContext(UserContext);
    const [formData, setFormData] = useState(initialValues);
    const [user, setUser] = useState();
    const { value: categoryIds, onChange: handleCategoryChange } = useCheckboxGroup();


    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (formData) => {
        try {
            const response = await fetch('http://localhost:3000/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                console.log('form data submitted successfully: ', formData)
                onClose()

            }
        }
        catch (error) {
            console.error('Error submitting data', error)
        }
    };

    const handleUserChange = (e) => {
        setUser(e.target.value)
    }

    const handleCancel = () => {
        setFormData(initialValues);
        onCancel();
    };

    return (
        <Box as="form" onSubmit={handleSubmit}>
            <FormControl id="title" isRequired>
                <FormLabel>Title</FormLabel>
                <Input name="title" value={formData.title} onChange={handleChange} />
            </FormControl>

            <FormControl id="description" isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </FormControl>

            <FormControl id="location" isRequired>
                <FormLabel>Location</FormLabel>
                <Input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                />
            </FormControl>

            <FormControl id="startTime" isRequired>
                <FormLabel>Start Time</FormLabel>
                <Input
                    type="datetime-local"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                />
            </FormControl>

            <FormControl id="endTime" isRequired>
                <FormLabel>End Time</FormLabel>
                <Input
                    type="datetime-local"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                />
            </FormControl>

            <FormControl id="createdBy" isRequired>
                <FormLabel>Created By</FormLabel>
                <Select value={user} onChange={handleUserChange}>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>))
                    }
                </Select>
            </FormControl>

            <FormControl id="categoryIds" isRequired>
                <FormLabel>Categories</FormLabel>
                <CheckboxGroup
                    value={categoryIds}
                    onChange={handleCategoryChange}
                >
                    {categories.map((category) => (
                        <Checkbox key={category.id} value={category.id}>
                            {category.name}
                        </Checkbox>
                    ))}
                </CheckboxGroup>

            </FormControl>
            <Button type='submit' onClick={handleSubmit}>Submit</Button>
            <Button onClick={handleCancel} variant={"ghost"}>Cancel</Button>

        </Box>
    );
};