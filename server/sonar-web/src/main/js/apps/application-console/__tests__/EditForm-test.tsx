/*
 * SonarQube
 * Copyright (C) 2009-2020 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

/* eslint-disable sonarjs/no-duplicate-string */
import { shallow } from 'enzyme';
import * as React from 'react';
import SimpleModal from 'sonar-ui-common/components/controls/SimpleModal';
import { change, waitAndUpdate } from 'sonar-ui-common/helpers/testUtils';
import { mockApplication } from '../../../helpers/mocks/application';
import { Application } from '../../../types/application';
import EditForm from '../EditForm';

it('should render correctly', () => {
  expect(
    shallowRender()
      .find(SimpleModal)
      .dive()
  ).toMatchSnapshot();
});

it('should correctly submit the new info', async () => {
  const onChange = jest.fn().mockResolvedValue({});
  const onClose = jest.fn();
  const onEdit = jest.fn();
  const wrapper = shallowRender({ onChange, onClose, onEdit });
  const modal = wrapper.find(SimpleModal).dive();

  change(modal.find('#view-edit-name'), 'New name');
  change(modal.find('#view-edit-description'), 'New description');

  wrapper.instance().handleFormSubmit();
  expect(onChange).toBeCalledWith('foo', 'New name', 'New description');
  await waitAndUpdate(wrapper);
  expect(onEdit).toBeCalledWith('foo', 'New name', 'New description');
  expect(onClose).toBeCalled();
});

function shallowRender(props: Partial<EditForm<Application>['props']> = {}) {
  return shallow<EditForm<Application>>(
    <EditForm
      header="Edit"
      onChange={jest.fn()}
      onClose={jest.fn()}
      onEdit={jest.fn()}
      application={mockApplication()}
      {...props}
    />
  );
}
