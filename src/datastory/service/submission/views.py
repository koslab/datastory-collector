from typing import Any, List
from fastapi import APIRouter, Depends, Body
from sqlmodel import Session, select
from datastory.service.submission.model import Submission
from datastory.db import get_session

router = APIRouter(prefix="/submissions", tags=["submissions"])


@router.get("", response_model=List[Submission])
async def get_submissions(session: Session = Depends(get_session)):
    submissions = session.exec(select(Submission)).all()
    return submissions


@router.post("")
async def create_submission(
    submission_data: Any = Body(...), session: Session = Depends(get_session)
):
    submission = Submission(content=submission_data)
    session.add(submission)
    session.commit()
    session.refresh(submission)
    return submission
