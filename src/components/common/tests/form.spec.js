import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from '../Form';
import { FormProvider } from "@pankod/refine-react-hook-form";
import React from 'react';

describe('Form component', () => {
    const mockOnFinishHandler = jest.fn();
    const Wrapper = (props) => {
        return (
            <FormProvider register={() => { }} handleSubmit={() => { }}>
                {props.children}
            </FormProvider>
        );
    };


    test('should render the basic fields', () => {

        render(
            <Wrapper>
                <Form
                    type="Test"
                    formLoading={false}
                    handleImageChange={jest.fn()}
                    onFinishHandler={mockOnFinishHandler}
                    propertyImage={null}

                />
            </Wrapper>
        );

        expect(screen.getByTestId('property-name')).toBeInTheDocument();

        expect(screen.getByTestId('property-description')).toBeInTheDocument();

        expect(screen.getByTestId('property-type')).toBeInTheDocument();

        expect(screen.getByTestId('property-price')).toBeInTheDocument();
        expect(screen.getByTestId('upload-button')).toBeInTheDocument();

    });


    test('upload  files', () => {
        render(
            <Wrapper>
                <Form
                    type="Test"
                    formLoading={false}
                    handleImageChange={jest.fn()}
                    onFinishHandler={mockOnFinishHandler}
                    propertyImage={null}

                />
            </Wrapper>
        );
       
        const file = new File(['file content'], 'image.png', { type: 'image/png' });

        // Нахождение <input> элемента
        const inputElement = screen.getByTestId('upload-input');
      
        // Имитация события изменения файла
        fireEvent.change(inputElement, { target: { files: [file] } });

    })
    test('renders Form correctly', () => {
        const { asFragment } = render(
            <Wrapper>
                <Form
                    type="Test"
                    formLoading={false}
                    handleImageChange={jest.fn()}
                    onFinishHandler={mockOnFinishHandler}
                    propertyImage={null}

                />
            </Wrapper>
        );;
        expect(asFragment()).toMatchSnapshot();
    });

});


