import React, { memo } from 'react';
import S from './styles';
import { MdInbox, MdAlarmOn, MdEvent, MdAlarmAdd } from 'react-icons/md';

const ActivityResume = ({ data, addActivity }) => {
  return (
    <S.Container>
      {data === null && (
        <S.Empty>
          <span><MdEvent size={64} /></span>
          <span>Select a day to see your activities</span>
        </S.Empty>
      )}

      {data !== null && (
        <>
          <S.Title>
            <div>{data.dateFormatted}</div>

            <S.AddButton onClick={() => addActivity(data.timestamp)}>
              <MdAlarmAdd size={24} />
              <span>Add</span>
            </S.AddButton>
          </S.Title>

          {data.logsOfDay.length === 0 && (
            <S.Empty>
              <span><MdInbox size={64} /></span>
              <span>No activities</span>
            </S.Empty>
          )}

          {data.logsOfDay.length >= 1 && (
            <S.List>
              {data.logsOfDay.map((item, index) => (
                <S.ListItem key={`activity-resume-list-item-${index}`}>
                  <span><MdAlarmOn size={24} /></span>
                  <span>{item}</span>
                </S.ListItem>
              ))}
            </S.List>
          )}

        </>
      )}
    </S.Container>
  )
}

export default memo(ActivityResume);
